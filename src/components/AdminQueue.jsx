import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, doc, updateDoc, deleteField } from 'firebase/firestore';

export default function AdminQueue({ language }) {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    // ARCHITECTURAL UPGRADE: Real-time listener for pending requests
    const q = query(
      collection(db, 'users'), 
      where('upgradeRequest.status', '==', 'pending')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const requests = [];
      snapshot.forEach((docSnap) => {
        requests.push({ id: docSnap.id, ...docSnap.data() });
      });
      
      // Sort locally: oldest requests first (FIFO queue)
      requests.sort((a, b) => {
        const timeA = a.upgradeRequest?.submittedAt?.toMillis() || 0;
        const timeB = b.upgradeRequest?.submittedAt?.toMillis() || 0;
        return timeA - timeB;
      });

      setPendingRequests(requests);
      setIsLoading(false);
    }, (error) => {
      console.error("Error listening to admin queue:", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleApprove = async (userId) => {
    if (!window.confirm(language === 'zh' ? '確認款項已入帳並開通權限？' : 'Verify payment received and upgrade account?')) return;
    
    setProcessingId(userId);
    try {
      const userRef = doc(db, 'users', userId);
      
      // Mutate the backend: Upgrade tier and wipe the pending request
      await updateDoc(userRef, {
        subscriptionTier: 'founding-member',
        upgradeRequest: deleteField() 
      });
    } catch (error) {
      console.error("Error approving upgrade:", error);
      alert(language === 'zh' ? '處理失敗，請檢查權限。' : 'Action failed. Check console.');
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (userId) => {
    if (!window.confirm(language === 'zh' ? '確認駁回此申請？' : 'Reject this upgrade request?')) return;
    
    setProcessingId(userId);
    try {
      const userRef = doc(db, 'users', userId);
      
      // Mutate the backend: Update request status to rejected
      await updateDoc(userRef, {
        'upgradeRequest.status': 'rejected'
      });
    } catch (error) {
      console.error("Error rejecting upgrade:", error);
    } finally {
      setProcessingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-4 border-brand-orange"></div>
      </div>
    );
  }

  return (
    <div className="w-full animate-fade-in-up">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h3 className="text-2xl font-black text-slate-800">
            {language === 'zh' ? '創始會員驗證佇列' : 'Founding Member Queue'}
          </h3>
          <p className="text-slate-500 text-sm mt-1">
            {language === 'zh' ? `待處理：${pendingRequests.length} 筆` : `${pendingRequests.length} pending requests`}
          </p>
        </div>
      </div>

      {pendingRequests.length === 0 ? (
        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl py-12 text-center text-slate-400 font-bold">
          {language === 'zh' ? '目前沒有待處理的升級申請。' : 'No pending upgrade requests.'}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-100 text-slate-800 font-bold uppercase text-xs">
              <tr>
                <th className="px-6 py-4">{language === 'zh' ? '家長' : 'Parent'}</th>
                <th className="px-6 py-4">{language === 'zh' ? '帳號 (後五碼)' : 'Bank Code (Last 5)'}</th>
                <th className="px-6 py-4">{language === 'zh' ? '申請時間' : 'Submitted At'}</th>
                <th className="px-6 py-4 text-right">{language === 'zh' ? '操作' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {pendingRequests.map((request) => {
                const isProcessing = processingId === request.id;
                const submittedDate = request.upgradeRequest?.submittedAt?.toDate();
                
                return (
                  <tr key={request.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{request.parentName}</div>
                      <div className="text-xs text-slate-500">{request.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-orange-100 text-brand-orange font-mono font-black tracking-wider rounded-lg">
                        {request.upgradeRequest?.bankDigits}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {submittedDate ? (
                        <div className="text-xs">
                          <div>{submittedDate.toLocaleDateString()}</div>
                          <div className="text-slate-400">{submittedDate.toLocaleTimeString()}</div>
                        </div>
                      ) : 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button 
                        onClick={() => handleReject(request.id)}
                        disabled={isProcessing}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-lg transition-colors disabled:opacity-50"
                      >
                        {language === 'zh' ? '駁回' : 'Reject'}
                      </button>
                      <button 
                        onClick={() => handleApprove(request.id)}
                        disabled={isProcessing}
                        className="px-4 py-2 bg-brand-green hover:bg-green-600 text-white font-bold rounded-lg shadow-sm transition-colors disabled:opacity-50"
                      >
                        {isProcessing ? '...' : (language === 'zh' ? '核准並開通' : 'Approve')}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}