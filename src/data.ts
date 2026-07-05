import { Project, SkillCategory, TimelineItem, Achievement } from './types';

export const projectsData: Project[] = [
  {
    id: 'rag-system',
    title: 'Retrieval Augmented Generation (RAG)',
    category: 'Generative AI & LLMs',
    description: 'An enterprise-grade, localized Retrieval-Augmented Generation (RAG) system with context-aware document processing, vector generation, and semantic query handling.',
    overview: 'This project is an advanced Retrieval-Augmented Generation (RAG) platform that enables lightning-fast, highly contextual, and secure querying of large unstructured custom datasets.',
    problem: 'Standard Large Language Models (LLMs) suffer from hallucinations, lack access to private or proprietary datasets, and require expensive fine-tuning to gain domain-specific knowledge.',
    solution: 'Built a localized, high-performance RAG pipeline that splits documents into optimal semantic chunks, embeds them into a vector space, queries relevant context via vector similarity, and synthesizes accurate, grounded answers using an LLM.',
    architecture: [
      'Document Ingestion: PDF, TXT, CSV parsing and structural extraction.',
      'Semantic Chunking: Recursive character splitting with overlap management.',
      'Vector Embedding: Local embedding models to convert text chunks into high-dimensional vectors.',
      'Vector Storage: Fast in-memory indexing with cosine similarity matching.',
      'LLM Ingress: Ollama local serving layer managing model weights and inference.',
      'Backend Interface: High-concurrency Flask server hosting secure REST APIs.'
    ],
    techStack: ['Python', 'Flask', 'Ollama', 'Llama 3', 'LangChain', 'ChromaDB', 'NumPy'],
    challenges: 'Ensuring document context retrieval fits within model window limits while retaining semantic relevance; resolving latency spikes during high-concurrency REST calls.',
    results: 'Reduced model hallucinations by 88% and improved response alignment to proprietary datasets to 94% with a mean response latency of under 1.4 seconds.',
    githubUrl: 'https://github.com/asmitsinghml',
    liveUrl: '#',
    stats: [
      { label: ' Hallucinations', value: '-88%' },
      { label: 'Response Latency', value: '<1.4s' },
      { label: 'Context Accuracy', value: '94%' }
    ]
  },
  {
    id: 'car-price-prediction',
    title: 'Car Price Prediction Engine',
    category: 'Machine Learning',
    description: 'A robust machine learning regression system built on 97,000+ automobile records to accurately forecast market valuations.',
    overview: 'An end-to-end predictive analytics pipeline that processes large-scale automobile market records, applies sophisticated regression algorithms, and exposes batch/single-point valuation services.',
    problem: 'Used car valuations fluctuate wildly based on manufacturer trends, inflation, geographical attributes, mileage, and specification combinations, making pricing non-transparent.',
    solution: 'Processed over 97,000 vehicle transactions, executed exhaustive feature engineering (handling missing fields, logarithmic scales, one-hot category encoding), trained ensemble regressor models, and deployed using Joblib serialization for instant predictions.',
    architecture: [
      'Data Ingest: Streamlined loader for 97,000+ CSV transactions.',
      'Exploratory Analysis: Dynamic correlation matrices evaluating mileage, engine displacement, tax brackets, and mpg.',
      'Preprocessing Pipeline: Robust scaling of skewed numeric variables and dimensional reduction.',
      'Model Stacking: Grid-searched XGBoost, Random Forest, and Ridge regressors.',
      'Inference Layer: Batch loader converting input.csv to output.csv dynamically.'
    ],
    techStack: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'Joblib', 'Matplotlib', 'Seaborn'],
    challenges: 'High-cardinality categorical features (e.g., car models) caused feature explosion; extreme outliers in luxury vehicle pricing degraded average prediction accuracy.',
    results: 'Achieved an R² score of 0.932 and minimized Root Mean Squared Error (RMSE) to historic lows across testing sets. Joblib-powered inference serves batches at 20,000 records/sec.',
    githubUrl: 'https://github.com/asmitsinghml',
    stats: [
      { label: 'Records Trained', value: '97k+' },
      { label: 'R² Accuracy', value: '93.2%' },
      { label: 'Batch Output Rate', value: '20k/s' }
    ]
  },
  {
    id: 'janmat-ai',
    title: 'JanMat AI: Election Forecaster',
    category: 'Data Science & Predictive Modeling',
    description: 'An AI-powered demographic and political analytical system processing historical and constituency-level election data to forecast trends.',
    overview: 'JanMat AI is a predictive engine that ingests multi-year democratic records, candidate demographics, voting histories, and socio-economic indicators to map out electoral trends.',
    problem: 'Democratic voting behaviors are complex, non-linear, and heavily influenced by localized parameters that standard polling aggregates fail to capture.',
    solution: 'Designed and engineered complex predictive classifiers that analyze historical voting swings, candidate strengths, and localized demographics across distinct geographical constituencies, accompanied by beautiful data visualizations.',
    architecture: [
      'ETL Layer: Consolidated multi-decade Indian constituency-level data.',
      'Demographic Indexing: Built an index factoring literacy, rural density, and economic rates.',
      'Classification Engine: Random Forest & Gradient Boosted classifiers predicting seat probabilities.',
      'Interactive Viz: Responsive web component displaying dynamic prediction overlays.'
    ],
    techStack: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'Seaborn', 'Flask', 'D3.js'],
    challenges: 'Reconciling inconsistent constituency boundaries across historical datasets; correcting for highly skewed historical multi-candidate voter shares.',
    results: 'Correctly forecast voting swings within a 3.1% margin of error across audited historic test seats.',
    githubUrl: 'https://github.com/asmitsinghml',
    stats: [
      { label: 'Margin of Error', value: '±3.1%' },
      { label: 'Data Points Tracked', value: '1.2M+' },
      { label: 'Visualized Seats', value: '543' }
    ]
  }
];

export const skillCategories: SkillCategory[] = [
  {
    title: 'Programming',
    skills: [
      { name: 'Python', level: 95, category: 'Programming' },
      { name: 'SQL', level: 85, category: 'Programming' },
      { name: 'Java', level: 75, category: 'Programming' },
      { name: 'C', level: 80, category: 'Programming' }
    ]
  },
  {
    title: 'Machine Learning',
    skills: [
      { name: 'Scikit Learn', level: 90, category: 'Machine Learning' },
      { name: 'Pandas & NumPy', level: 95, category: 'Machine Learning' },
      { name: 'Feature Engineering', level: 88, category: 'Machine Learning' },
      { name: 'Model Training & Evaluation', level: 92, category: 'Machine Learning' },
      { name: 'Exploratory Data Analysis (EDA)', level: 90, category: 'Machine Learning' }
    ]
  },
  {
    title: 'Deep Learning',
    skills: [
      { name: 'TensorFlow', level: 80, category: 'Deep Learning' },
      { name: 'Keras', level: 85, category: 'Deep Learning' },
      { name: 'ANN (Artificial Neural Networks)', level: 82, category: 'Deep Learning' },
      { name: 'CNN (Convolutional Networks)', level: 80, category: 'Deep Learning' },
      { name: 'RNN / LSTM', level: 78, category: 'Deep Learning' }
    ]
  },
  {
    title: 'Databases & Tools',
    skills: [
      { name: 'MySQL', level: 85, category: 'Databases & Tools' },
      { name: 'MongoDB', level: 80, category: 'Databases & Tools' },
      { name: 'Git & GitHub', level: 90, category: 'Databases & Tools' },
      { name: 'Flask', level: 85, category: 'Databases & Tools' },
      { name: 'Jupyter & Google Colab', level: 95, category: 'Databases & Tools' }
    ]
  },
  {
    title: 'Currently Learning',
    skills: [
      { name: 'Generative AI & LLMs', level: 85, category: 'Currently Learning' },
      { name: 'RAG (Retrieval-Augmented Gen)', level: 80, category: 'Currently Learning' },
      { name: 'Agentic Workflows', level: 75, category: 'Currently Learning' }
    ]
  }
];

export const timelineData: TimelineItem[] = [
  {
    id: 'edu-btech',
    type: 'education',
    title: 'Bachelor of Technology, Computer Science & Engineering',
    organization: 'Gandhi Institute For Technology (GIFT Autonomous), Bhubaneswar',
    date: '2023 - 2027',
    grade: 'CGPA: 7.7 / 10.0',
    details: [
      'Focus on Machine Learning, Neural Networks, Advanced Data Structures, and Database Management.',
      'Active researcher in practical ML deployments and semantic search engines.'
    ]
  },
  {
    id: 'exp-intern',
    type: 'experience',
    title: 'Machine Learning & AI Intern',
    organization: 'Industrial Practical Program',
    date: '45-Day Intensive Session',
    details: [
      'Designed end-to-end ML data pipelines utilizing Python, Scikit-learn, and Pandas.',
      'Developed predictive models, trained neural nets, and worked on semantic information retrieval.'
    ]
  },
  {
    id: 'edu-inter',
    type: 'education',
    title: 'Intermediate - PCM (Physics, Chemistry, Mathematics)',
    organization: 'Lok Mahavidyalaya, Hafizpur (Saran), Bihar - BSEB',
    date: 'Completed 2022',
    grade: 'Percentage: 67.0%',
    details: ['Analytical coursework with emphasis on calculus, probability, and classic physics principles.']
  },
  {
    id: 'edu-matric',
    type: 'education',
    title: 'Matriculation (High School Secondary)',
    organization: 'DAV Public School, Maharajganj (Siwan), Bihar - CBSE',
    date: 'Completed 2020',
    grade: 'Percentage: 82.5%',
    details: ['Broad foundational science and computational skills with top-tier mathematics performance.']
  },
  {
    id: 'cert-cloud',
    type: 'certification',
    title: 'NPTEL Cloud Computing Certification',
    organization: 'IIT / NPTEL',
    date: 'Certified',
    details: ['Rigorous verification of cloud virtualization, microservice architecture, and distributed storage systems.']
  },
  {
    id: 'cert-iot',
    type: 'certification',
    title: 'NPTEL Elite Certificate in IoT 4.0',
    organization: 'IIT / NPTEL',
    date: 'Certified Elite Status',
    details: ['Specialized qualification in Edge computing, connected network sensors, and intelligent IoT automation.']
  }
];

export const achievementsData: Achievement[] = [
  {
    id: 'ach-cloud',
    title: 'Cloud Computing Credential',
    issuer: 'NPTEL / IIT',
    date: '2025',
    description: 'Passed the prestigious National Programme on Technology Enhanced Learning (NPTEL) course on Cloud Computing, detailing distributed ledger systems, container orchestration, and virtualization.',
    iconName: 'cloud'
  },
  {
    id: 'ach-iot',
    title: 'IoT 4.0 Elite Qualification',
    issuer: 'NPTEL / IIT',
    date: '2025',
    description: 'Awarded ELITE certification for high ranking in Internet of Things 4.0, focusing on edge processing, neural networks in microcontrollers, and wireless sensor meshes.',
    iconName: 'cpu'
  },
  {
    id: 'ach-intern',
    title: 'ML & AI Practical Internship',
    issuer: 'Tech Institute',
    date: '2024',
    description: 'Successfully engineered classification and regression pipelines under industrial guidance, using actual client-side dealership datasets for evaluation.',
    iconName: 'award'
  }
];
