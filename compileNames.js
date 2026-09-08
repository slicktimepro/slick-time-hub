import fs from 'fs';

// 1. Read the raw CSV file
const csvData = fs.readFileSync('name_list.csv', 'utf8');
const lines = csvData.split(/\r?\n/).filter(line => line.trim() !== '');

// 2. Extract headers and data rows
const rows = lines.slice(1);

// CLIL/ESL Syllable Estimator
function countSyllables(word) {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

// ESL Phonetic Difficulty Rater
function assessDifficulty(word, syllables) {
  const lower = word.toLowerCase();
  if (syllables >= 4 || lower.match(/(th|ph|sch|squ|qu|z|x)/)) return 'Hard';
  if (syllables === 3 || lower.match(/(v|j|br|cr|gr|tr|dr)/)) return 'Medium';
  return 'Easy';
}

// BULLETPROOF CSV PARSER: Handles commas inside quotes AND preserves empty columns
function parseCSVRow(rowStr) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < rowStr.length; i++) {
    const char = rowStr[i];
    if (char === '"') {
      inQuotes = !inQuotes; // Toggle quote state
    } else if (char === ',' && !inQuotes) {
      result.push(current); // End of column
      current = '';
    } else {
      current += char; // Add character to current column
    }
  }
  result.push(current); // Push the final column
  return result;
}

const nameDatabase = rows.map((row, index) => {
  // Use the bulletproof parser instead of regex
  const columns = parseCSVRow(row);
  
  // Clean the text to remove hidden Excel quotes and invisible spaces
  const rawSex = (columns[0] || '').replace(/["'\s]/g, '').toUpperCase();
  const englishName = (columns[1] || '').replace(/["']/g, '').trim();
  const origin = (columns[4] || '').replace(/["']/g, '').trim();
  const meaning = (columns[5] || '').replace(/["']/g, '').trim();
  
  // 🇹🇼 Bilingual Gender Mapping
  let gender = 'unisex';
  
  if (rawSex === 'M' || rawSex === '男') {
    gender = 'male';
  } else if (rawSex === 'F' || rawSex === '女') {
    gender = 'female';
  } else if (rawSex === 'MF' || rawSex === '男女') {
    gender = 'mostly_male';
  } else if (rawSex === 'FM' || rawSex === '女男') {
    gender = 'mostly_female';
  } else {
    gender = 'unisex'; // Catches blanks, 'U', or '不分男女'
  }
  
  const syllables = countSyllables(englishName);
  const phoneticDifficulty = assessDifficulty(englishName, syllables);

  return {
    id: `${gender.charAt(0)}${String(index + 1).padStart(4, '0')}`,
    englishName: englishName,
    traditionalChinese: "", 
    gender: gender,
    syllables: syllables,
    phoneticDifficulty: phoneticDifficulty,
    origin: origin,
    meaning: meaning
  };
});

// 3. Write output to the React Data Folder
const fileContent = `export const nameData = ${JSON.stringify(nameDatabase, null, 2)};\n`;
fs.writeFileSync('./src/data/nameData.js', fileContent);

console.log(`✅ Compilation Complete: ${nameDatabase.length} names parsed and saved to src/data/nameData.js`);