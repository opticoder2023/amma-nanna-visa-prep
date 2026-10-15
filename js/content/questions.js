// Generated from the prototype; edit freely. Contains NO personal family data — that lives in the private family pack.
export const CATS = {
 "start": [
  "మొదలు",
  "Greeting"
 ],
 "purpose": [
  "ప్రయాణ ఉద్దేశం",
  "Purpose of trip"
 ],
 "son": [
  "అబ్బాయి గురించి",
  "About your son"
 ],
 "home": [
  "ఇండియాలో జీవితం",
  "Life in India"
 ],
 "money": [
  "ఖర్చులు, డబ్బు",
  "Money"
 ],
 "history": [
  "ప్రయాణ చరిత్ర",
  "Travel history"
 ],
 "other": [
  "ఇతర ప్రశ్నలు",
  "Other questions"
 ],
 "say": [
  "మీరు చెప్పే మాటలు",
  "Phrases you say"
 ],
 "hear": [
  "ఆఫీసర్ చెప్పే మాటలు",
  "Officer may say"
 ]
};
export const DETAIL_LABELS = {
 "spouse": ["భర్త లేదా భార్య", "Husband or wife"],
 "nannaName": [
  "నాన్న పేరు",
  "Father's name"
 ],
 "ammaName": [
  "అమ్మ పేరు",
  "Mother's name"
 ],
 "nannaWork": [
  "నాన్న పని చేసిన చోటు",
  "Where father worked"
 ],
 "ammaWork": [
  "అమ్మ పని చేసిన చోటు",
  "Where mother worked"
 ],
 "sonName": [
  "అబ్బాయి పేరు",
  "Son's name"
 ],
 "city": [
  "అబ్బాయి ఉండే నగరం",
  "Son's city"
 ],
 "sonJob": [
  "అబ్బాయి ఉద్యోగం",
  "Son's job title"
 ],
 "company": [
  "కంపెనీ పేరు",
  "Son's company"
 ],
 "sonYears": [
  "అమెరికాలో ఎన్ని ఏళ్ళు",
  "Years son has been in US"
 ],
 "sonSalary": [
  "అబ్బాయి జీతం (ఏడాదికి)",
  "Son's salary per year"
 ],
 "dilName": [
  "కోడలి పేరు",
  "Daughter-in-law's name"
 ],
 "dilJob": [
  "కోడలి ఉద్యోగం",
  "Daughter-in-law's job"
 ],
 "daughterCity": [
  "అమ్మాయి ఉండే ఊరు",
  "Daughter's city"
 ],
 "hometown": [
  "మీ ఊరు",
  "Your town in India"
 ],
 "state": [
  "రాష్ట్రం",
  "State"
 ],
 "stayLength": [
  "ఎంత కాలం ఉంటారు",
  "Length of stay"
 ],
 "travelMonth": [
  "వెళ్ళే నెల",
  "Travel month"
 ],
 "returnMonth": [
  "తిరిగి వచ్చే నెల",
  "Return month"
 ],
 "prevVisit": [
  "ఇంతకు ముందు వెళ్ళిన సంవత్సరం",
  "Year of earlier US visit"
 ],
 "otherTravel": [
  "వెళ్ళిన ఇతర దేశాలు",
  "Other countries visited"
 ],
 "pension": [
  "నెల పెన్షన్ (రూపాయలు)",
  "Monthly pension (rupees)"
 ],
 "savings": [
  "బ్యాంక్ బ్యాలెన్స్ (రూపాయలు)",
  "Bank balance (rupees)"
 ],
 "myName": [
  "మీ పేరు",
  "Your name"
 ],
 "myWork": [
  "మీరు పని చేసిన చోటు",
  "Where you worked"
 ],
 "myDob": [
  "పుట్టిన తేదీ",
  "Date of birth"
 ],
 "sonFullName": [
  "అబ్బాయి పూర్తి పేరు",
  "Son's full name"
 ],
 "sonAddress": [
  "అమెరికాలో చిరునామా",
  "US address"
 ],
 "myOtherName": [
  "పెళ్ళికి ముందు పేరు",
  "Name before marriage"
 ],
 "nannaDob": [
  "నాన్న పుట్టిన తేదీ",
  "Father's date of birth"
 ],
 "ammaDob": [
  "అమ్మ పుట్టిన తేదీ",
  "Mother's date of birth"
 ],
 "nannaOtherName": [
  "నాన్న వేరే పేరు",
  "Father's other name"
 ],
 "ammaOtherName": [
  "అమ్మ పెళ్ళికి ముందు పేరు",
  "Mother's name before marriage"
 ]
};
export const DETAIL_KEYS = [
 "nannaName",
 "ammaName",
 "nannaWork",
 "ammaWork",
 "sonName",
 "city",
 "sonJob",
 "company",
 "sonYears",
 "sonSalary",
 "dilName",
 "dilJob",
 "daughterCity",
 "hometown",
 "state",
 "stayLength",
 "travelMonth",
 "returnMonth",
 "prevVisit",
 "otherTravel",
 "pension",
 "savings",
 "nannaDob",
 "ammaDob",
 "sonFullName",
 "sonAddress",
 "ammaOtherName",
 "nannaOtherName"
];
export const QUESTIONS = [
 {
  "id": "q1",
  "cat": "start",
  "core": true,
  "en": "Good morning.",
  "pr": "గుడ్ మార్నింగ్.",
  "te": "నమస్కారం (శుభోదయం).",
  "vars": [
   [
    "Good afternoon.",
    "గుడ్ ఆఫ్టర్‌నూన్."
   ]
  ],
  "ans": [
   {
    "l": "ఆఫీసర్ మగవారైతే",
    "en": "Good morning, sir.",
    "pr": "గుడ్ మార్నింగ్, సర్.",
    "te": "నమస్కారం సార్."
   },
   {
    "l": "ఆఫీసర్ ఆడవారైతే",
    "en": "Good morning, madam.",
    "pr": "గుడ్ మార్నింగ్, మేడమ్.",
    "te": "నమస్కారం మేడమ్."
   }
  ],
  "tip": "కిటికీ దగ్గరకు వెళ్ళగానే నవ్వుతూ చెప్పండి. మధ్యాహ్నం అయితే Good afternoon (గుడ్ ఆఫ్టర్‌నూన్) అనండి."
 },
 {
  "id": "q2",
  "cat": "start",
  "core": true,
  "en": "Please give me your passport.",
  "pr": "ప్లీజ్ గివ్ మీ యువర్ పాస్‌పోర్ట్.",
  "te": "మీ పాస్‌పోర్ట్ ఇవ్వండి.",
  "vars": [
   [
    "Passport, please.",
    "పాస్‌పోర్ట్, ప్లీజ్."
   ],
   [
    "Can I see your passport?",
    "కెన్ ఐ సీ యువర్ పాస్‌పోర్ట్?"
   ]
  ],
  "ans": [
   {
    "en": "Here it is.",
    "pr": "హియర్ ఇట్ ఈజ్.",
    "te": "ఇదిగోండి."
   }
  ],
  "tip": "పాస్‌పోర్ట్ చేతిలోనే సిద్ధంగా పెట్టుకోండి. ఆఫీసర్ అడిగితేనే వేరే పత్రాలు ఇవ్వండి."
 },
 {
  "id": "q3",
  "cat": "start",
  "core": true,
  "en": "What is your name?",
  "pr": "వాట్ ఈజ్ యువర్ నేమ్?",
  "te": "మీ పేరు ఏమిటి?",
  "vars": [
   [
    "Your name, please.",
    "యువర్ నేమ్, ప్లీజ్."
   ]
  ],
  "ans": [
   {
    "en": "My name is {myName}.",
    "pr": "మై నేమ్ ఈజ్ {myName}.",
    "te": "నా పేరు {myName}."
   }
  ]
 },
 {
  "id": "q41",
  "cat": "start",
  "core": true,
  "en": "What is your date of birth?",
  "pr": "వాట్ ఈజ్ యువర్ డేట్ ఆఫ్ బర్త్?",
  "te": "మీ పుట్టిన తేదీ ఏమిటి?",
  "vars": [
   [
    "When were you born?",
    "వెన్ వర్ యు బోర్న్?"
   ]
  ],
  "ans": [
   {
    "en": "{myDob}.",
    "pr": "{myDob}.",
    "te": "{myDob}."
   }
  ]
 },
 {
  "id": "p1",
  "cat": "say",
  "type": "say",
  "core": true,
  "en": "Sorry, can you please repeat?",
  "pr": "సారీ, కెన్ యు ప్లీజ్ రిపీట్?",
  "te": "క్షమించండి, మళ్ళీ చెప్పగలరా?",
  "tip": "ప్రశ్న అర్థం కాకపోతే ఊహించి జవాబు చెప్పకండి. ఇది అడగడం పూర్తిగా సరైనదే."
 },
 {
  "id": "q5",
  "cat": "purpose",
  "core": true,
  "en": "What is the purpose of your visit?",
  "pr": "వాట్ ఈజ్ ది పర్పస్ ఆఫ్ యువర్ విజిట్?",
  "te": "మీ ప్రయాణం ఉద్దేశం ఏమిటి? (ఎందుకు వెళ్తున్నారు?)",
  "vars": [
   [
    "Why are you going to the US?",
    "వై ఆర్ యు గోయింగ్ టు ది యు.ఎస్?"
   ],
   [
    "Why do you want to go to America?",
    "వై డు యు వాంట్ టు గో టు అమెరికా?"
   ],
   [
    "What is the reason for your trip?",
    "వాట్ ఈజ్ ది రీజన్ ఫర్ యువర్ ట్రిప్?"
   ]
  ],
  "ans": [
   {
    "en": "To visit my son {sonName} and his family in {city}.",
    "pr": "టు విజిట్ మై సన్ {sonName} అండ్ హిజ్ ఫ్యామిలీ ఇన్ {city}.",
    "te": "{city} లో ఉన్న మా అబ్బాయి {sonName} ని, వాళ్ళ కుటుంబాన్ని చూడటానికి."
   }
  ],
  "tip": "ఇది చాలా ముఖ్యమైన ప్రశ్న. ఒక్క వాక్యంలో, స్పష్టంగా చెప్పండి."
 },
 {
  "id": "q6",
  "cat": "purpose",
  "core": true,
  "en": "Who are you going to visit?",
  "pr": "హూ ఆర్ యు గోయింగ్ టు విజిట్?",
  "te": "మీరు ఎవరిని చూడటానికి వెళ్తున్నారు?",
  "vars": [
   [
    "Who do you know in the US?",
    "హూ డు యు నో ఇన్ ది యు.ఎస్?"
   ],
   [
    "Who lives in America?",
    "హూ లివ్స్ ఇన్ అమెరికా?"
   ]
  ],
  "ans": [
   {
    "en": "My son, {sonName}, and his wife, {dilName}.",
    "pr": "మై సన్, {sonName}, అండ్ హిజ్ వైఫ్, {dilName}.",
    "te": "మా అబ్బాయి {sonName}, మా కోడలు {dilName}."
   }
  ]
 },
 {
  "id": "p2",
  "cat": "say",
  "type": "say",
  "core": true,
  "en": "Please speak slowly.",
  "pr": "ప్లీజ్ స్పీక్ స్లోలీ.",
  "te": "దయచేసి నెమ్మదిగా మాట్లాడండి."
 },
 {
  "id": "q10",
  "cat": "purpose",
  "core": true,
  "en": "Where will you stay?",
  "pr": "వేర్ విల్ యు స్టే?",
  "te": "మీరు ఎక్కడ ఉంటారు?",
  "vars": [
   [
    "Where will you live in the US?",
    "వేర్ విల్ యు లివ్ ఇన్ ది యు.ఎస్?"
   ]
  ],
  "ans": [
   {
    "en": "At my son's house in {city}.",
    "pr": "ఎట్ మై సన్స్ హౌస్ ఇన్ {city}.",
    "te": "{city} లో మా అబ్బాయి ఇంట్లో."
   }
  ]
 },
 {
  "id": "q8",
  "cat": "purpose",
  "core": true,
  "en": "How long will you stay?",
  "pr": "హౌ లాంగ్ విల్ యు స్టే?",
  "te": "మీరు ఎంత కాలం ఉంటారు?",
  "vars": [
   [
    "How long is your trip?",
    "హౌ లాంగ్ ఈజ్ యువర్ ట్రిప్?"
   ],
   [
    "How many months will you stay?",
    "హౌ మెనీ మంత్స్ విల్ యు స్టే?"
   ]
  ],
  "ans": [
   {
    "en": "About {stayLength}.",
    "pr": "అబౌట్ {stayLength}.",
    "te": "సుమారు {stayLength}."
   }
  ],
  "tip": "ఈ సమాధానం DS-160 ఫారం, ఇన్విటేషన్ లెటర్‌లో రాసిన దానితో సరిపోలాలి."
 },
 {
  "id": "q9",
  "cat": "purpose",
  "core": true,
  "en": "When will you come back?",
  "pr": "వెన్ విల్ యు కమ్ బ్యాక్?",
  "te": "మీరు ఎప్పుడు తిరిగి వస్తారు?",
  "vars": [
   [
    "When will you return to India?",
    "వెన్ విల్ యు రిటర్న్ టు ఇండియా?"
   ]
  ],
  "ans": [
   {
    "en": "After {stayLength}. We will come back to India.",
    "pr": "ఆఫ్టర్ {stayLength}. వి విల్ కమ్ బ్యాక్ టు ఇండియా.",
    "te": "{stayLength} తర్వాత. మేము ఇండియాకు తిరిగి వస్తాము."
   }
  ]
 },
 {
  "id": "q40",
  "cat": "purpose",
  "core": true,
  "en": "When are you planning to travel?",
  "pr": "వెన్ ఆర్ యు ప్లానింగ్ టు ట్రావెల్?",
  "te": "మీరు ఎప్పుడు ప్రయాణం చేయాలనుకుంటున్నారు?",
  "vars": [
   [
    "When will you go?",
    "వెన్ విల్ యు గో?"
   ]
  ],
  "ans": [
   {
    "en": "We plan to go in {travelMonth}.",
    "pr": "వి ప్లాన్ టు గో ఇన్ {travelMonth}.",
    "te": "మేము {travelMonth} లో వెళ్ళాలనుకుంటున్నాం."
   }
  ]
 },
 {
  "id": "q42",
  "cat": "son",
  "core": true,
  "en": "What is your son's full name?",
  "pr": "వాట్ ఈజ్ యువర్ సన్స్ ఫుల్ నేమ్?",
  "te": "మీ అబ్బాయి పూర్తి పేరు ఏమిటి?",
  "ans": [
   {
    "en": "{sonFullName}.",
    "pr": "{sonFullName}.",
    "te": "{sonFullName}."
   }
  ]
 },
 {
  "id": "q43",
  "cat": "son",
  "en": "What is your son's address?",
  "pr": "వాట్ ఈజ్ యువర్ సన్స్ అడ్రస్?",
  "te": "మీ అబ్బాయి ఇంటి చిరునామా ఏమిటి?",
  "ans": [
   {
    "en": "{sonAddress}.",
    "pr": "{sonAddress}.",
    "te": "{sonAddress}."
   }
  ],
  "tip": "పూర్తిగా గుర్తుండకపోతే నగరం పేరు చెప్పి, ఇన్విటేషన్ లెటర్ చూపించవచ్చు."
 },
 {
  "id": "q14",
  "cat": "son",
  "core": true,
  "en": "What does your son do?",
  "pr": "వాట్ డస్ యువర్ సన్ డు?",
  "te": "మీ అబ్బాయి ఏం పని చేస్తాడు?",
  "vars": [
   [
    "What is your son's job?",
    "వాట్ ఈజ్ యువర్ సన్స్ జాబ్?"
   ]
  ],
  "ans": [
   {
    "en": "He is a {sonJob} at {company}.",
    "pr": "హి ఈజ్ ఎ {sonJob} ఎట్ {company}.",
    "te": "అతను {company} లో {sonJob} గా పని చేస్తున్నాడు."
   }
  ],
  "tip": "ప్రోడక్ట్ మేనేజర్ అంటే: సాఫ్ట్‌వేర్ ఉత్పత్తులను ప్లాన్ చేసి, ఇంజనీర్ల బృందాన్ని నడిపించే ఉద్యోగం."
 },
 {
  "id": "q23",
  "cat": "home",
  "core": true,
  "en": "What do you do?",
  "pr": "వాట్ డు యు డు?",
  "te": "మీరు ఏం చేస్తుంటారు? (మీ పని ఏమిటి?)",
  "vars": [
   [
    "What is your occupation?",
    "వాట్ ఈజ్ యువర్ ఆక్యుపేషన్?"
   ],
   [
    "Are you working?",
    "ఆర్ యు వర్కింగ్?"
   ]
  ],
  "ans": [
   {
    "en": "I am retired.",
    "pr": "ఐ యామ్ రిటైర్డ్.",
    "te": "నేను రిటైర్ అయ్యాను.",
    "l": "రిటైర్ అయితే"
   },
   {
    "en": "I am a homemaker.",
    "pr": "ఐ యామ్ ఎ హోమ్‌మేకర్.",
    "te": "నేను గృహిణిని.",
    "l": "గృహిణి అయితే"
   },
   {
    "en": "I have a business.",
    "pr": "ఐ హ్యావ్ ఎ బిజినెస్.",
    "te": "నాకు వ్యాపారం ఉంది.",
    "l": "వ్యాపారం ఉంటే"
   },
   {
    "en": "I am a farmer.",
    "pr": "ఐ యామ్ ఎ ఫార్మర్.",
    "te": "నేను రైతును.",
    "l": "వ్యవసాయం అయితే"
   }
  ],
  "tip": "మీకు సరిపోయే ఒక్క సమాధానమే నేర్చుకోండి."
 },
 {
  "id": "q25",
  "cat": "home",
  "core": true,
  "en": "Where do you live in India?",
  "pr": "వేర్ డు యు లివ్ ఇన్ ఇండియా?",
  "te": "ఇండియాలో మీరు ఎక్కడ ఉంటారు?",
  "vars": [
   [
    "Where are you from?",
    "వేర్ ఆర్ యు ఫ్రమ్?"
   ]
  ],
  "ans": [
   {
    "en": "We live in {hometown}, {state}.",
    "pr": "వి లివ్ ఇన్ {hometown}, {state}.",
    "te": "మేము {state} లోని {hometown} లో ఉంటాము."
   }
  ]
 },
 {
  "id": "q28",
  "cat": "home",
  "core": true,
  "en": "Why will you come back to India?",
  "pr": "వై విల్ యు కమ్ బ్యాక్ టు ఇండియా?",
  "te": "మీరు ఇండియాకు ఎందుకు తిరిగి వస్తారు?",
  "vars": [
   [
    "What will bring you back?",
    "వాట్ విల్ బ్రింగ్ యు బ్యాక్?"
   ],
   [
    "How do I know you will return?",
    "హౌ డు ఐ నో యు విల్ రిటర్న్?"
   ]
  ],
  "ans": [
   {
    "en": "Our home, our family, and our life are in India.",
    "pr": "అవర్ హోమ్, అవర్ ఫ్యామిలీ, అండ్ అవర్ లైఫ్ ఆర్ ఇన్ ఇండియా.",
    "te": "మా ఇల్లు, మా కుటుంబం, మా జీవితం అంతా ఇండియాలోనే ఉంది."
   }
  ],
  "tip": "అత్యంత ముఖ్యమైన విషయం ఇదే: మీరు ఖచ్చితంగా తిరిగి వస్తారు అని ఆఫీసర్‌కు నమ్మకం కలగాలి."
 },
 {
  "id": "q30",
  "cat": "money",
  "core": true,
  "en": "Who is paying for your trip?",
  "pr": "హూ ఈజ్ పేయింగ్ ఫర్ యువర్ ట్రిప్?",
  "te": "మీ ప్రయాణ ఖర్చులు ఎవరు భరిస్తున్నారు?",
  "vars": [
   [
    "Who is sponsoring you?",
    "హూ ఈజ్ స్పాన్సరింగ్ యు?"
   ]
  ],
  "ans": [
   {
    "en": "My son is paying.",
    "pr": "మై సన్ ఈజ్ పేయింగ్.",
    "te": "మా అబ్బాయి భరిస్తున్నాడు.",
    "l": "అబ్బాయి కడితే"
   },
   {
    "en": "We are paying ourselves.",
    "pr": "వి ఆర్ పేయింగ్ అవర్‌సెల్వ్స్.",
    "te": "మేమే భరిస్తున్నాం.",
    "l": "మీరే కడితే"
   }
  ]
 },
 {
  "id": "q36",
  "cat": "other",
  "core": true,
  "en": "Who is travelling with you?",
  "pr": "హూ ఈజ్ ట్రావెలింగ్ విత్ యు?",
  "te": "మీతో ఎవరు ప్రయాణిస్తున్నారు?",
  "vars": [
   [
    "Are you travelling alone?",
    "ఆర్ యు ట్రావెలింగ్ అలోన్?"
   ]
  ],
  "ans": [
   {
    "en": "My {spouse}.",
    "pr": "మై {spouse}.",
    "te": "నా {spouse}."
   }
  ]
 },
 {
  "id": "q7",
  "cat": "history",
  "core": true,
  "en": "Is this your first visit to the US?",
  "pr": "ఈజ్ దిస్ యువర్ ఫస్ట్ విజిట్ టు ది యు.ఎస్?",
  "te": "అమెరికాకు ఇది మీ మొదటి ప్రయాణమా?",
  "vars": [
   [
    "Have you been to America before?",
    "హ్యావ్ యు బీన్ టు అమెరికా బిఫోర్?"
   ]
  ],
  "ans": [
   {
    "en": "Yes, this is my first visit.",
    "pr": "యెస్, దిస్ ఈజ్ మై ఫస్ట్ విజిట్.",
    "te": "అవును, ఇది నా మొదటి ప్రయాణం.",
    "l": "మొదటిసారి అయితే"
   },
   {
    "en": "No, I visited in {prevVisit}.",
    "pr": "నో, ఐ విజిటెడ్ ఇన్ {prevVisit}.",
    "te": "కాదు, {prevVisit} లో వెళ్ళాను.",
    "l": "ఇంతకు ముందు వెళ్ళి ఉంటే"
   }
  ]
 },
 {
  "id": "p3",
  "cat": "say",
  "type": "say",
  "core": true,
  "en": "I do not understand.",
  "pr": "ఐ డు నాట్ అండర్‌స్టాండ్.",
  "te": "నాకు అర్థం కాలేదు."
 },
 {
  "id": "q15",
  "cat": "son",
  "core": true,
  "en": "Which company does he work for?",
  "pr": "విచ్ కంపెనీ డస్ హి వర్క్ ఫర్?",
  "te": "అతను ఏ కంపెనీలో పని చేస్తాడు?",
  "vars": [
   [
    "Where does your son work?",
    "వేర్ డస్ యువర్ సన్ వర్క్?"
   ]
  ],
  "ans": [
   {
    "en": "He works at {company}.",
    "pr": "హి వర్క్స్ ఎట్ {company}.",
    "te": "అతను {company} లో పని చేస్తాడు."
   }
  ]
 },
 {
  "id": "q17",
  "cat": "son",
  "core": true,
  "en": "What is his visa status?",
  "pr": "వాట్ ఈజ్ హిజ్ వీసా స్టేటస్?",
  "te": "అతనికి ఏ రకం వీసా ఉంది?",
  "vars": [
   [
    "Is he a US citizen?",
    "ఈజ్ హి ఎ యు.ఎస్ సిటిజన్?"
   ],
   [
    "Does he have a green card?",
    "డస్ హి హ్యావ్ ఎ గ్రీన్ కార్డ్?"
   ]
  ],
  "ans": [
   {
    "en": "He is on an H-1B visa.",
    "pr": "హి ఈజ్ ఆన్ యాన్ హెచ్-వన్-బి వీసా.",
    "te": "అతనికి H-1B వీసా ఉంది.",
    "l": "H-1B అయితే"
   },
   {
    "en": "He has a green card.",
    "pr": "హి హ్యాజ్ ఎ గ్రీన్ కార్డ్.",
    "te": "అతనికి గ్రీన్ కార్డ్ ఉంది.",
    "l": "గ్రీన్ కార్డ్ అయితే"
   },
   {
    "en": "He is a US citizen.",
    "pr": "హి ఈజ్ ఎ యు.ఎస్ సిటిజన్.",
    "te": "అతను అమెరికా పౌరుడు.",
    "l": "పౌరసత్వం ఉంటే"
   }
  ],
  "tip": "అబ్బాయిని అడిగి సరైనది ఒక్కటే నేర్చుకోండి."
 },
 {
  "id": "q26",
  "cat": "home",
  "core": true,
  "en": "Do you own a house?",
  "pr": "డు యు ఓన్ ఎ హౌస్?",
  "te": "మీకు సొంత ఇల్లు ఉందా?",
  "ans": [
   {
    "en": "Yes, we own our house.",
    "pr": "యెస్, వి ఓన్ అవర్ హౌస్.",
    "te": "అవును, మాకు సొంత ఇల్లు ఉంది.",
    "l": "సొంత ఇల్లు అయితే"
   },
   {
    "en": "No, we live in a rented house.",
    "pr": "నో, వి లివ్ ఇన్ ఎ రెంటెడ్ హౌస్.",
    "te": "లేదు, అద్దె ఇంట్లో ఉంటున్నాం.",
    "l": "అద్దె ఇల్లు అయితే"
   }
  ]
 },
 {
  "id": "q33",
  "cat": "history",
  "core": true,
  "en": "Have you travelled to any other country?",
  "pr": "హ్యావ్ యు ట్రావెల్డ్ టు ఎనీ అదర్ కంట్రీ?",
  "te": "మీరు వేరే ఏదైనా దేశానికి వెళ్ళారా?",
  "vars": [
   [
    "Have you been abroad before?",
    "హ్యావ్ యు బీన్ అబ్రాడ్ బిఫోర్?"
   ],
   [
    "Is this your first passport?",
    "ఈజ్ దిస్ యువర్ ఫస్ట్ పాస్‌పోర్ట్?"
   ]
  ],
  "ans": [
   {
    "en": "No, this is our first trip abroad.",
    "pr": "నో, దిస్ ఈజ్ అవర్ ఫస్ట్ ట్రిప్ అబ్రాడ్.",
    "te": "లేదు, విదేశాలకు ఇదే మా మొదటి ప్రయాణం.",
    "l": "వెళ్ళకపోతే"
   },
   {
    "en": "Yes, we went to {otherTravel}.",
    "pr": "యెస్, వి వెంట్ టు {otherTravel}.",
    "te": "అవును, మేము {otherTravel} వెళ్ళాము.",
    "l": "వెళ్ళి ఉంటే"
   }
  ]
 },
 {
  "id": "q35",
  "cat": "other",
  "core": true,
  "en": "Will you work in the US?",
  "pr": "విల్ యు వర్క్ ఇన్ ది యు.ఎస్?",
  "te": "మీరు అమెరికాలో పని (ఉద్యోగం) చేస్తారా?",
  "vars": [
   [
    "Are you going there to work?",
    "ఆర్ యు గోయింగ్ దేర్ టు వర్క్?"
   ]
  ],
  "ans": [
   {
    "en": "No. We are only visiting.",
    "pr": "నో. వి ఆర్ ఓన్లీ విజిటింగ్.",
    "te": "లేదు. మేము చూడటానికి మాత్రమే వెళ్తున్నాం."
   }
  ],
  "tip": "విజిటర్ వీసా మీద అమెరికాలో ఉద్యోగం చేయకూడదు."
 },
 {
  "id": "p4",
  "cat": "say",
  "type": "say",
  "core": true,
  "en": "Can I answer in Telugu?",
  "pr": "కెన్ ఐ ఆన్సర్ ఇన్ తెలుగు?",
  "te": "నేను తెలుగులో సమాధానం చెప్పవచ్చా?",
  "tip": "ఇంగ్లీష్ కష్టంగా ఉంటే ఇది అడగవచ్చు. తెలుగు సహాయం దొరుకుతుందని గ్యారెంటీ లేదు, అందుకే చిన్న ఇంగ్లీష్ సమాధానాలు నేర్చుకోండి."
 },
 {
  "id": "q4",
  "cat": "start",
  "en": "How are you?",
  "pr": "హౌ ఆర్ యు?",
  "te": "మీరు ఎలా ఉన్నారు?",
  "ans": [
   {
    "en": "I am fine, thank you.",
    "pr": "ఐ యామ్ ఫైన్, థాంక్ యు.",
    "te": "నేను బాగున్నాను, ధన్యవాదాలు."
   }
  ]
 },
 {
  "id": "q11",
  "cat": "purpose",
  "en": "Which places will you visit?",
  "pr": "విచ్ ప్లేసెస్ విల్ యు విజిట్?",
  "te": "మీరు ఏ ఏ ప్రదేశాలు చూస్తారు?",
  "vars": [
   [
    "Will you travel to other cities?",
    "విల్ యు ట్రావెల్ టు అదర్ సిటీస్?"
   ]
  ],
  "ans": [
   {
    "en": "Mostly {city}. Maybe some places nearby.",
    "pr": "మోస్ట్‌లీ {city}. మేబీ సమ్ ప్లేసెస్ నియర్‌బై.",
    "te": "ఎక్కువగా {city} లోనే. దగ్గరలో కొన్ని ప్రదేశాలు చూడవచ్చు."
   }
  ]
 },
 {
  "id": "q12",
  "cat": "purpose",
  "en": "Is there any special reason for this trip?",
  "pr": "ఈజ్ దేర్ ఎనీ స్పెషల్ రీజన్ ఫర్ దిస్ ట్రిప్?",
  "te": "ఈ ప్రయాణానికి ఏదైనా ప్రత్యేక కారణం ఉందా?",
  "vars": [
   [
    "Is there any function or event?",
    "ఈజ్ దేర్ ఎనీ ఫంక్షన్ ఆర్ ఈవెంట్?"
   ]
  ],
  "ans": [
   {
    "en": "No. We just want to spend time with our son.",
    "pr": "నో. వి జస్ట్ వాంట్ టు స్పెండ్ టైమ్ విత్ అవర్ సన్.",
    "te": "లేదు. మా అబ్బాయితో కొంత సమయం గడపాలని అనుకుంటున్నాం."
   }
  ],
  "tip": "నిజంగా ఏదైనా కారణం ఉంటే (పెళ్ళి, డెలివరీ వంటివి) అదే నిజాయితీగా చెప్పండి."
 },
 {
  "id": "q13",
  "cat": "purpose",
  "en": "Do you have a return ticket?",
  "pr": "డు యు హ్యావ్ ఎ రిటర్న్ టికెట్?",
  "te": "మీకు తిరుగు ప్రయాణం టికెట్ ఉందా?",
  "ans": [
   {
    "en": "Yes, we have booked it.",
    "pr": "యెస్, వి హ్యావ్ బుక్ట్ ఇట్.",
    "te": "అవును, బుక్ చేశాం.",
    "l": "బుక్ చేసి ఉంటే"
   },
   {
    "en": "Not yet. We will book after the visa.",
    "pr": "నాట్ యెట్. వి విల్ బుక్ ఆఫ్టర్ ది వీసా.",
    "te": "ఇంకా లేదు. వీసా వచ్చాక బుక్ చేస్తాం.",
    "l": "ఇంకా బుక్ చేయకపోతే"
   }
  ]
 },
 {
  "id": "q16",
  "cat": "son",
  "en": "How long has he been in the US?",
  "pr": "హౌ లాంగ్ హ్యాజ్ హి బీన్ ఇన్ ది యు.ఎస్?",
  "te": "అతను అమెరికాలో ఎన్ని సంవత్సరాలుగా ఉన్నాడు?",
  "vars": [
   [
    "When did your son go to America?",
    "వెన్ డిడ్ యువర్ సన్ గో టు అమెరికా?"
   ]
  ],
  "ans": [
   {
    "en": "About {sonYears} years.",
    "pr": "అబౌట్ {sonYears} ఇయర్స్.",
    "te": "సుమారు {sonYears} సంవత్సరాలు."
   }
  ]
 },
 {
  "id": "q18",
  "cat": "son",
  "en": "Is your son married?",
  "pr": "ఈజ్ యువర్ సన్ మ్యారీడ్?",
  "te": "మీ అబ్బాయికి పెళ్ళి అయిందా?",
  "vars": [
   [
    "When did he get married?",
    "వెన్ డిడ్ హి గెట్ మ్యారీడ్?"
   ]
  ],
  "ans": [
   {
    "en": "Yes. His wife is {dilName}. She is a {dilJob}.",
    "pr": "యెస్. హిజ్ వైఫ్ ఈజ్ {dilName}. షి ఈజ్ ఎ {dilJob}.",
    "te": "అవును. అతని భార్య (మా కోడలు) {dilName}. ఆమె {dilJob}."
   }
  ]
 },
 {
  "id": "q19",
  "cat": "son",
  "en": "Does he have children?",
  "pr": "డస్ హి హ్యావ్ చిల్డ్రన్?",
  "te": "అతనికి పిల్లలు ఉన్నారా?",
  "ans": [
   {
    "en": "No, not yet.",
    "pr": "నో, నాట్ యెట్.",
    "te": "లేదు, ఇంకా లేరు.",
    "l": "లేకపోతే"
   },
   {
    "en": "Yes, one child.",
    "pr": "యెస్, వన్ చైల్డ్.",
    "te": "అవును, ఒక బిడ్డ.",
    "l": "ఒకరు ఉంటే"
   },
   {
    "en": "Yes, two children.",
    "pr": "యెస్, టూ చిల్డ్రన్.",
    "te": "అవును, ఇద్దరు పిల్లలు.",
    "l": "ఇద్దరు ఉంటే"
   }
  ]
 },
 {
  "id": "q20",
  "cat": "son",
  "en": "How much does your son earn?",
  "pr": "హౌ మచ్ డస్ యువర్ సన్ ఎర్న్?",
  "te": "మీ అబ్బాయి ఎంత సంపాదిస్తాడు?",
  "vars": [
   [
    "What is his salary?",
    "వాట్ ఈజ్ హిజ్ శాలరీ?"
   ]
  ],
  "ans": [
   {
    "en": "About {sonSalary} per year.",
    "pr": "అబౌట్ {sonSalary} పర్ ఇయర్.",
    "te": "సంవత్సరానికి సుమారు {sonSalary}."
   }
  ],
  "tip": "ఖచ్చితంగా తెలియకపోతే 'About' (అబౌట్ = సుమారు) అని చెప్పండి. అబ్బాయిని అడిగి గుర్తుంచుకోండి."
 },
 {
  "id": "q21",
  "cat": "son",
  "en": "Do you have other children?",
  "pr": "డు యు హ్యావ్ అదర్ చిల్డ్రన్?",
  "te": "మీకు ఇంకా పిల్లలు ఉన్నారా?",
  "vars": [
   [
    "How many children do you have?",
    "హౌ మెనీ చిల్డ్రన్ డు యు హ్యావ్?"
   ],
   [
    "Where does your daughter live?",
    "వేర్ డస్ యువర్ డాటర్ లివ్?"
   ]
  ],
  "ans": [
   {
    "en": "Yes, a daughter. She lives in {daughterCity}.",
    "pr": "యెస్, ఎ డాటర్. షి లివ్స్ ఇన్ {daughterCity}.",
    "te": "అవును, ఒక అమ్మాయి. ఆమె {daughterCity} లో ఉంటుంది."
   }
  ]
 },
 {
  "id": "q22",
  "cat": "son",
  "en": "Do you have any other relatives in the US?",
  "pr": "డు యు హ్యావ్ ఎనీ అదర్ రెలెటివ్స్ ఇన్ ది యు.ఎస్?",
  "te": "అమెరికాలో మీకు ఇంకా బంధువులు ఎవరైనా ఉన్నారా?",
  "ans": [
   {
    "en": "No, only my son.",
    "pr": "నో, ఓన్లీ మై సన్.",
    "te": "లేదు, మా అబ్బాయి మాత్రమే."
   }
  ]
 },
 {
  "id": "q24",
  "cat": "home",
  "en": "Where did you work before?",
  "pr": "వేర్ డిడ్ యు వర్క్ బిఫోర్?",
  "te": "ఇంతకు ముందు మీరు ఎక్కడ పని చేశారు?",
  "vars": [
   [
    "When did you retire?",
    "వెన్ డిడ్ యు రిటైర్?"
   ]
  ],
  "ans": [
   {
    "en": "I worked at {myWork} for many years.",
    "pr": "ఐ వర్క్ట్ ఎట్ {myWork} ఫర్ మెనీ ఇయర్స్.",
    "te": "నేను చాలా సంవత్సరాలు {myWork} లో పని చేశాను."
   }
  ]
 },
 {
  "id": "q27",
  "cat": "home",
  "en": "Who will look after your house?",
  "pr": "హూ విల్ లుక్ ఆఫ్టర్ యువర్ హౌస్?",
  "te": "మీరు లేనప్పుడు మీ ఇంటిని ఎవరు చూసుకుంటారు?",
  "ans": [
   {
    "en": "Our relative will look after it.",
    "pr": "అవర్ రెలెటివ్ విల్ లుక్ ఆఫ్టర్ ఇట్.",
    "te": "మా బంధువు చూసుకుంటారు.",
    "l": "బంధువులు అయితే"
   },
   {
    "en": "Our daughter will look after it.",
    "pr": "అవర్ డాటర్ విల్ లుక్ ఆఫ్టర్ ఇట్.",
    "te": "మా అమ్మాయి చూసుకుంటుంది.",
    "l": "అమ్మాయి అయితే"
   }
  ]
 },
 {
  "id": "q29",
  "cat": "home",
  "en": "Do you have any property or land?",
  "pr": "డు యు హ్యావ్ ఎనీ ప్రాపర్టీ ఆర్ ల్యాండ్?",
  "te": "మీకు ఏదైనా ఆస్తి లేదా భూమి ఉందా?",
  "ans": [
   {
    "en": "Yes, we have a house and some land.",
    "pr": "యెస్, వి హ్యావ్ ఎ హౌస్ అండ్ సమ్ ల్యాండ్.",
    "te": "అవును, మాకు ఇల్లు, కొంత భూమి ఉన్నాయి.",
    "l": "ఇల్లు, భూమి ఉంటే"
   },
   {
    "en": "Yes, we have our house.",
    "pr": "యెస్, వి హ్యావ్ అవర్ హౌస్.",
    "te": "అవును, మాకు ఇల్లు ఉంది.",
    "l": "ఇల్లు మాత్రమే ఉంటే"
   }
  ]
 },
 {
  "id": "q31",
  "cat": "money",
  "en": "What is your monthly income?",
  "pr": "వాట్ ఈజ్ యువర్ మంత్లీ ఇన్‌కమ్?",
  "te": "మీ నెల ఆదాయం ఎంత?",
  "vars": [
   [
    "Do you get a pension?",
    "డు యు గెట్ ఎ పెన్షన్?"
   ]
  ],
  "ans": [
   {
    "en": "My pension is {pension} rupees per month.",
    "pr": "మై పెన్షన్ ఈజ్ {pension} రుపీస్ పర్ మంత్.",
    "te": "నా పెన్షన్ నెలకు {pension} రూపాయలు."
   }
  ]
 },
 {
  "id": "q32",
  "cat": "money",
  "en": "How much money do you have in the bank?",
  "pr": "హౌ మచ్ మనీ డు యు హ్యావ్ ఇన్ ది బ్యాంక్?",
  "te": "బ్యాంక్‌లో మీకు ఎంత డబ్బు ఉంది?",
  "ans": [
   {
    "en": "About {savings} rupees.",
    "pr": "అబౌట్ {savings} రుపీస్.",
    "te": "సుమారు {savings} రూపాయలు."
   }
  ],
  "tip": "మీ బ్యాంక్ స్టేట్‌మెంట్‌లో ఉన్న సంఖ్యకు దగ్గరగానే చెప్పండి."
 },
 {
  "id": "q34",
  "cat": "history",
  "en": "Have you ever been refused a US visa?",
  "pr": "హ్యావ్ యు ఎవర్ బీన్ రిఫ్యూజ్డ్ ఎ యు.ఎస్ వీసా?",
  "te": "మీకు ఎప్పుడైనా అమెరికా వీసా రిజెక్ట్ అయిందా?",
  "vars": [
   [
    "Did you apply before?",
    "డిడ్ యు అప్లై బిఫోర్?"
   ]
  ],
  "ans": [
   {
    "en": "No, never.",
    "pr": "నో, నెవర్.",
    "te": "లేదు, ఎప్పుడూ లేదు.",
    "l": "ఎప్పుడూ లేకపోతే"
   },
   {
    "en": "Yes, once.",
    "pr": "యెస్, వన్స్.",
    "te": "అవును, ఒకసారి.",
    "l": "ఒకసారి అయి ఉంటే"
   }
  ],
  "tip": "ఈ విషయంలో ఎప్పుడూ నిజమే చెప్పండి. ఆఫీసర్ కంప్యూటర్‌లో పాత వివరాలు కనిపిస్తాయి."
 },
 {
  "id": "q37",
  "cat": "other",
  "en": "Who filled your application form?",
  "pr": "హూ ఫిల్డ్ యువర్ అప్లికేషన్ ఫామ్?",
  "te": "మీ అప్లికేషన్ ఫామ్ ఎవరు నింపారు?",
  "vars": [
   [
    "Did you fill the form yourself?",
    "డిడ్ యు ఫిల్ ది ఫామ్ యువర్‌సెల్ఫ్?"
   ]
  ],
  "ans": [
   {
    "en": "My son helped us fill it.",
    "pr": "మై సన్ హెల్ప్ట్ అస్ ఫిల్ ఇట్.",
    "te": "మా అబ్బాయి నింపడంలో సహాయం చేశాడు."
   }
  ]
 },
 {
  "id": "q44",
  "cat": "other",
  "en": "Have you used any other name?",
  "pr": "హ్యావ్ యు యూజ్డ్ ఎనీ అదర్ నేమ్?",
  "te": "మీరు ఎప్పుడైనా వేరే పేరు వాడారా?",
  "vars": [
   [
    "What was your name before marriage?",
    "వాట్ వాజ్ యువర్ నేమ్ బిఫోర్ మ్యారేజ్?"
   ]
  ],
  "ans": [
   {
    "en": "No.",
    "pr": "నో.",
    "te": "లేదు.",
    "l": "వేరే పేరు లేకపోతే"
   },
   {
    "en": "Yes. Before marriage, my name was {myOtherName}.",
    "pr": "యెస్. బిఫోర్ మ్యారేజ్, మై నేమ్ వాజ్ {myOtherName}.",
    "te": "అవును. పెళ్ళికి ముందు నా పేరు {myOtherName}.",
    "l": "పెళ్ళికి ముందు వేరే పేరు ఉంటే"
   }
  ]
 },
 {
  "id": "q38",
  "cat": "other",
  "en": "Do you speak English?",
  "pr": "డు యు స్పీక్ ఇంగ్లీష్?",
  "te": "మీరు ఇంగ్లీష్ మాట్లాడగలరా?",
  "ans": [
   {
    "l": "కొంచెం వస్తే",
    "en": "A little.",
    "pr": "ఎ లిటిల్.",
    "te": "కొంచెం."
   },
   {
    "l": "రాకపోతే",
    "en": "No. Can I speak in Telugu, please?",
    "pr": "నో. కెన్ ఐ స్పీక్ ఇన్ తెలుగు, ప్లీజ్?",
    "te": "లేదు. నేను తెలుగులో మాట్లాడవచ్చా?"
   }
  ]
 },
 {
  "id": "q39",
  "cat": "other",
  "en": "Do you have travel health insurance?",
  "pr": "డు యు హ్యావ్ ట్రావెల్ హెల్త్ ఇన్‌షూరెన్స్?",
  "te": "మీకు ప్రయాణ ఆరోగ్య బీమా ఉందా?",
  "ans": [
   {
    "en": "Yes, we will buy it before the trip.",
    "pr": "యెస్, వి విల్ బై ఇట్ బిఫోర్ ది ట్రిప్.",
    "te": "అవును, ప్రయాణానికి ముందు తీసుకుంటాం.",
    "l": "తీసుకోబోతుంటే"
   },
   {
    "en": "Yes, we have it.",
    "pr": "యెస్, వి హ్యావ్ ఇట్.",
    "te": "అవును, మాకు ఉంది.",
    "l": "ఇప్పటికే ఉంటే"
   }
  ]
 },
 {
  "id": "p5",
  "cat": "say",
  "type": "say",
  "en": "I am not sure.",
  "pr": "ఐ యామ్ నాట్ ష్యూర్.",
  "te": "నాకు ఖచ్చితంగా తెలియదు.",
  "tip": "తెలియని విషయం ఊహించి చెప్పడం కంటే ఇది చెప్పడం మంచిది."
 },
 {
  "id": "p6",
  "cat": "say",
  "type": "say",
  "en": "Thank you very much.",
  "pr": "థాంక్ యు వెరీ మచ్.",
  "te": "చాలా ధన్యవాదాలు."
 },
 {
  "id": "p7",
  "cat": "say",
  "type": "say",
  "en": "Here are the documents.",
  "pr": "హియర్ ఆర్ ది డాక్యుమెంట్స్.",
  "te": "ఇవిగోండి పత్రాలు."
 },
 {
  "id": "o1",
  "cat": "hear",
  "type": "hear",
  "en": "Left hand, four fingers.",
  "pr": "లెఫ్ట్ హ్యాండ్, ఫోర్ ఫింగర్స్.",
  "te": "ఎడమ చేతి నాలుగు వేళ్ళు (స్కానర్ మీద పెట్టండి).",
  "tip": "కొన్నిసార్లు కిటికీ దగ్గర మళ్ళీ వేలిముద్రలు తీసుకుంటారు."
 },
 {
  "id": "o2",
  "cat": "hear",
  "type": "hear",
  "en": "Right hand, four fingers.",
  "pr": "రైట్ హ్యాండ్, ఫోర్ ఫింగర్స్.",
  "te": "కుడి చేతి నాలుగు వేళ్ళు."
 },
 {
  "id": "o3",
  "cat": "hear",
  "type": "hear",
  "en": "Both thumbs.",
  "pr": "బోత్ థంబ్స్.",
  "te": "రెండు బొటనవేళ్ళు."
 },
 {
  "id": "o8",
  "cat": "hear",
  "type": "hear",
  "en": "Please wait.",
  "pr": "ప్లీజ్ వెయిట్.",
  "te": "దయచేసి ఆగండి."
 },
 {
  "id": "o4",
  "cat": "hear",
  "type": "hear",
  "en": "Your visa is approved.",
  "pr": "యువర్ వీసా ఈజ్ అప్రూవ్డ్.",
  "te": "మీ వీసా వచ్చింది (ఆమోదించారు).",
  "ans": [
   {
    "en": "Thank you very much.",
    "pr": "థాంక్ యు వెరీ మచ్.",
    "te": "చాలా ధన్యవాదాలు."
   }
  ]
 },
 {
  "id": "o5",
  "cat": "hear",
  "type": "hear",
  "en": "We will keep your passport.",
  "pr": "వి విల్ కీప్ యువర్ పాస్‌పోర్ట్.",
  "te": "మీ పాస్‌పోర్ట్ మేము ఉంచుకుంటాం.",
  "tip": "ఇది మంచి సంకేతం. వీసా స్టాంప్ వేసి తర్వాత పంపిస్తారు."
 },
 {
  "id": "o7",
  "cat": "hear",
  "type": "hear",
  "en": "We need more documents.",
  "pr": "వి నీడ్ మోర్ డాక్యుమెంట్స్.",
  "te": "మాకు ఇంకా కొన్ని పత్రాలు కావాలి.",
  "tip": "ఒక కాగితం ఇస్తారు. దాన్ని అబ్బాయికి చూపించండి."
 },
 {
  "id": "o6",
  "cat": "hear",
  "type": "hear",
  "en": "I am sorry, I cannot give you a visa today.",
  "pr": "ఐ యామ్ సారీ, ఐ కెనాట్ గివ్ యు ఎ వీసా టుడే.",
  "te": "క్షమించండి, ఈ రోజు వీసా ఇవ్వలేను.",
  "tip": "ప్రశాంతంగా ఉండండి. ఒక కాగితం ఇస్తారు. మళ్ళీ అప్లై చేయవచ్చు."
 }
];
