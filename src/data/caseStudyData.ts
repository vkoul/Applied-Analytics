export interface CaseStudy {
  id: string
  title: string
  company: string
  year: string
  summary: string
  violation: string
  violationTag: string
  lessonsLearned: string[]
  relatedChapter: string
}

export const caseStudyData: CaseStudy[] = [
  {
    id: 'netflix-prize',
    title: 'Netflix Prize: Predicting Movie Ratings',
    company: 'Netflix',
    year: '2006-2009',
    summary: 'Netflix offered $1M for a 10% improvement in their movie recommendation algorithm. Teams combined diverse models — linear, SVD, nearest-neighbor — to win. The winning model was too complex to deploy, but the competition advanced collaborative filtering.',
    violation: 'Model complexity vs. deployment',
    violationTag: 'model-selection',
    lessonsLearned: [
      'Ensemble methods can improve predictions but may be impractical to deploy.',
      'A 10% improvement in RMSE required combining hundreds of models — diminishing returns are real.',
      'The business value of a better recommendation algorithm justified the prize, even if the exact winning model was not deployed.',
    ],
    relatedChapter: '/ch2',
  },
  {
    id: 'challenger-disaster',
    title: 'Challenger Disaster: Logistic Regression That Wasn\'t Done',
    company: 'NASA',
    year: '1986',
    summary: 'Engineers at Morton Thiokol warned about O-ring failure risk at low temperatures. However, they only plotted flights with O-ring damage, excluding damage-free flights. A proper logistic regression on ALL flights would have shown a clear temperature-failure relationship.',
    violation: 'Selection bias in binary response analysis',
    violationTag: 'binary-response',
    lessonsLearned: [
      'Always include all observations, not just those where the event occurred — that is selection bias.',
      'Binary response models (logistic regression) are the correct tool when the outcome is yes/no.',
      'Visualization of the wrong subset can be more misleading than no analysis at all.',
    ],
    relatedChapter: '/ch3',
  },
  {
    id: 'healthcare-spending',
    title: 'Healthcare Spending Analysis: The Censoring Problem',
    company: 'RAND Corporation',
    year: '1974-1982',
    summary: 'The RAND Health Insurance Experiment studied how insurance affects healthcare spending. Many participants had zero spending (censored at 0). Using OLS on this data produced biased estimates. The Tobit model was essential for properly handling the mass point at zero.',
    violation: 'Ignoring censoring in spending data',
    violationTag: 'censoring',
    lessonsLearned: [
      'Healthcare and insurance data frequently have a mass point at zero — OLS is inappropriate.',
      'The Tobit model correctly separates the decision to spend from how much to spend.',
      'Policy implications change dramatically when censoring is properly accounted for.',
    ],
    relatedChapter: '/ch4',
  },
  {
    id: 'insurance-claims',
    title: 'Auto Insurance Claims: When Poisson Meets Reality',
    company: 'Insurance Industry',
    year: 'Ongoing',
    summary: 'Insurance companies model the number of claims per policy. While Poisson regression is the starting point, real claims data is almost always overdispersed (variance >> mean) with excess zeros (many policies with no claims). Zero-inflated negative binomial models are now standard.',
    violation: 'Overdispersion in count data',
    violationTag: 'count-data',
    lessonsLearned: [
      'Always check for overdispersion before relying on Poisson regression — it almost never holds for insurance data.',
      'Zero-inflated models capture the two-process nature: whether a claim happens, and if so, how many.',
      'Underestimating variance leads to overly narrow confidence intervals and false significance.',
    ],
    relatedChapter: '/ch5',
  },
  {
    id: 'customer-churn',
    title: 'Telecom Customer Churn: Survival vs. Binary',
    company: 'Telecom Industry',
    year: 'Ongoing',
    summary: 'Telecom companies initially modeled churn as a binary outcome (left/stayed). But this ignores WHEN customers leave — a customer who leaves after 1 month is very different from one who leaves after 3 years. Survival analysis (Cox model) captures time-to-churn and handles right-censored customers (those still active).',
    violation: 'Ignoring time dimension in churn',
    violationTag: 'survival',
    lessonsLearned: [
      'Binary models lose information about timing — survival models tell you not just IF but WHEN.',
      'Active customers are right-censored, not missing data — they provide information about minimum survival time.',
      'Hazard ratios from Cox models are more actionable for retention campaigns than odds ratios from logistic regression.',
    ],
    relatedChapter: '/ch6',
  },
  {
    id: 'red-blue-bus',
    title: 'The Red Bus / Blue Bus Problem',
    company: 'Transportation Economics',
    year: '1972 (Debreu)',
    summary: 'A famous thought experiment exposing the IIA weakness in multinomial logit. If people split 50/50 between car and red bus, adding a blue bus (identical to the red bus) should split the bus share, giving car 50%, red bus 25%, blue bus 25%. But MNL predicts equal 33/33/33 split — violating common sense.',
    violation: 'IIA assumption in discrete choice',
    violationTag: 'iia',
    lessonsLearned: [
      'The IIA property means adding a new option reduces all existing options proportionally — which is often unrealistic.',
      'When alternatives share unobserved attributes (like red and blue buses), use nested logit or mixed logit.',
      'Always test for IIA using the Hausman-McFadden test before relying on MNL.',
    ],
    relatedChapter: '/ch7',
  },
  {
    id: 'returns-to-education',
    title: 'Returns to Education: The Classic IV Application',
    company: 'Labor Economics',
    year: '1991 (Angrist & Krueger)',
    summary: 'Estimating how much an extra year of education increases earnings is confounded by ability (smarter people get more education AND earn more). Angrist and Krueger used quarter of birth as an instrument: compulsory schooling laws mean children born in Q1 could drop out earlier. This provided exogenous variation in years of schooling.',
    violation: 'Endogeneity from omitted ability',
    violationTag: 'endogeneity',
    lessonsLearned: [
      'OLS overestimates returns to education because ability is an omitted confound.',
      'A good instrument (quarter of birth) is correlated with education but arguably unrelated to earnings directly.',
      'Even clever instruments can be debated — the exclusion restriction is never testable.',
    ],
    relatedChapter: '/ch8',
  },
  {
    id: 'target-customer-segmentation',
    title: 'Target\'s Customer Segmentation and Pregnancy Prediction',
    company: 'Target',
    year: '2012',
    summary: 'Target used clustering and predictive modeling on purchase data to identify customer segments, including pregnant women who had not yet announced their pregnancy. They sent targeted coupons, leading to a famous incident where a father learned of his teenage daughter\'s pregnancy from Target\'s mailers.',
    violation: 'Ethics of unsupervised segmentation',
    violationTag: 'clustering-ethics',
    lessonsLearned: [
      'Clustering can reveal sensitive segments that raise ethical concerns about privacy.',
      'Just because you CAN predict something from data does not mean you SHOULD act on it.',
      'Customer segmentation models need ethical review alongside technical validation.',
    ],
    relatedChapter: '/ch9',
  },
]
