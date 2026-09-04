export interface QuizQuestion {
  id: string
  question: string
  options: { id: string; text: string }[]
  correctId: string
  explanation: string
}

export const quizData: Record<string, QuizQuestion[]> = {
  ch1: [
    {
      id: 'ch1-q1',
      question: 'A company builds a dashboard showing last quarter\'s revenue by region. Which type of analytics is this?',
      options: [
        { id: 'a', text: 'Prescriptive analytics' },
        { id: 'b', text: 'Predictive analytics' },
        { id: 'c', text: 'Descriptive analytics' },
        { id: 'd', text: 'Diagnostic analytics' },
      ],
      correctId: 'c',
      explanation: 'Descriptive analytics summarizes what already happened. Predictive analytics would forecast future revenue; prescriptive would recommend actions to improve it.',
    },
    {
      id: 'ch1-q2',
      question: 'You observe 200 firms across 10 years, measuring profit each year. What type of data is this?',
      options: [
        { id: 'a', text: 'Cross-sectional data' },
        { id: 'b', text: 'Time series data' },
        { id: 'c', text: 'Panel data' },
        { id: 'd', text: 'Unstructured data' },
      ],
      correctId: 'c',
      explanation: 'Panel data has multiple entities observed over multiple time periods. Cross-sectional would be 200 firms at one point; time series would be one firm over 10 years.',
    },
    {
      id: 'ch1-q3',
      question: 'Which step in the analytics pipeline typically consumes the most time?',
      options: [
        { id: 'a', text: 'Model fitting' },
        { id: 'b', text: 'Data cleaning and preparation' },
        { id: 'c', text: 'Interpretation of results' },
        { id: 'd', text: 'Data collection' },
      ],
      correctId: 'b',
      explanation: 'Data cleaning routinely takes 60-80% of project time. Modeling, while intellectually central, is usually fast once the data is properly prepared.',
    },
    {
      id: 'ch1-q4',
      question: 'Your dependent variable is the number of customer complaints per month. Why is OLS regression problematic here?',
      options: [
        { id: 'a', text: 'OLS cannot handle more than one predictor' },
        { id: 'b', text: 'OLS assumes a continuous, unbounded response and can predict negative counts' },
        { id: 'c', text: 'OLS requires the dependent variable to be categorical' },
        { id: 'd', text: 'OLS cannot be estimated with maximum likelihood' },
      ],
      correctId: 'b',
      explanation: 'Count data is non-negative and discrete. OLS assumes a continuous response and can predict negative values, which are meaningless for counts. Poisson or negative binomial regression is appropriate.',
    },
    {
      id: 'ch1-q5',
      question: 'In a Generalized Linear Model, which component connects the mean of the response to the linear predictor?',
      options: [
        { id: 'a', text: 'The random component' },
        { id: 'b', text: 'The systematic component' },
        { id: 'c', text: 'The link function' },
        { id: 'd', text: 'The error term' },
      ],
      correctId: 'c',
      explanation: 'The link function g(μ) = η transforms the expected response to match the linear predictor\'s range. The random component specifies the distribution; the systematic component is the linear predictor Xβ itself.',
    },
  ],

  ch2: [
    {
      id: 'ch2-q1',
      question: 'If R² = 0.85, which interpretation is correct?',
      options: [
        { id: 'a', text: '85% of the variation in Y is explained by the model' },
        { id: 'b', text: 'The model predicts Y with 85% accuracy' },
        { id: 'c', text: 'Each predictor contributes 85% to the outcome' },
        { id: 'd', text: '85% of observations are correctly classified' },
      ],
      correctId: 'a',
      explanation: 'R² measures the proportion of total variance in Y explained by the model. It does not measure prediction accuracy in an absolute sense, nor does it tell you about individual predictor contributions.',
    },
    {
      id: 'ch2-q2',
      question: 'A regression has two predictors that are highly correlated (r = 0.95). What is the most likely consequence?',
      options: [
        { id: 'a', text: 'Biased coefficient estimates' },
        { id: 'b', text: 'Inflated standard errors making individual coefficients insignificant' },
        { id: 'c', text: 'A lower R² than expected' },
        { id: 'd', text: 'Heteroscedastic residuals' },
      ],
      correctId: 'b',
      explanation: 'Multicollinearity inflates standard errors, making it hard to detect individual effects. The coefficients remain unbiased (OLS is still BLUE), but their precision drops dramatically. R² may actually be high.',
    },
    {
      id: 'ch2-q3',
      question: 'You plot residuals against fitted values and see a fan shape (wider spread for larger fitted values). What does this indicate?',
      options: [
        { id: 'a', text: 'Multicollinearity' },
        { id: 'b', text: 'Omitted variable bias' },
        { id: 'c', text: 'Heteroscedasticity' },
        { id: 'd', text: 'Non-normality of residuals' },
      ],
      correctId: 'c',
      explanation: 'A fan shape means variance of errors increases with the level of Y — classic heteroscedasticity. Multicollinearity shows up in VIF, not residual plots. Non-normality would appear in a Q-Q plot.',
    },
    {
      id: 'ch2-q4',
      question: 'Adding a variable increases R² from 0.80 to 0.801 but adjusted R² drops from 0.795 to 0.793. What should you do?',
      options: [
        { id: 'a', text: 'Keep the variable because R² increased' },
        { id: 'b', text: 'Remove the variable — the adjusted R² decrease signals it adds noise, not signal' },
        { id: 'c', text: 'Add more variables to compensate' },
        { id: 'd', text: 'Transform the variable and try again' },
      ],
      correctId: 'b',
      explanation: 'R² never decreases when you add a variable, so it cannot distinguish signal from noise. Adjusted R² penalizes complexity; its decline means the variable\'s explanatory power doesn\'t justify the lost degree of freedom.',
    },
    {
      id: 'ch2-q5',
      question: 'Under the Gauss-Markov theorem, OLS is BLUE. If the homoscedasticity assumption is violated, which property is lost?',
      options: [
        { id: 'a', text: 'Linearity' },
        { id: 'b', text: 'Unbiasedness' },
        { id: 'c', text: 'Efficiency (minimum variance)' },
        { id: 'd', text: 'Consistency' },
      ],
      correctId: 'c',
      explanation: 'BLUE = Best Linear Unbiased Estimator. "Best" means minimum variance. With heteroscedasticity, OLS remains unbiased but is no longer the most efficient linear estimator — WLS or robust standard errors are needed.',
    },
  ],

  ch3: [
    {
      id: 'ch3-q1',
      question: 'In logistic regression, what does the model directly predict?',
      options: [
        { id: 'a', text: 'The probability of Y = 1' },
        { id: 'b', text: 'The log-odds of Y = 1' },
        { id: 'c', text: 'The class label (0 or 1)' },
        { id: 'd', text: 'The odds ratio' },
      ],
      correctId: 'b',
      explanation: 'The linear predictor Xβ gives log-odds. To get probabilities, you apply the inverse logit (sigmoid) function. The class label requires choosing a threshold. Odds ratios come from exponentiating coefficients.',
    },
    {
      id: 'ch3-q2',
      question: 'A logistic regression coefficient for "income" is 0.03. What does exp(0.03) ≈ 1.03 mean?',
      options: [
        { id: 'a', text: 'Income increases the probability of the event by 3%' },
        { id: 'b', text: 'A one-unit increase in income multiplies the odds of the event by 1.03' },
        { id: 'c', text: 'Income explains 3% of the variance' },
        { id: 'd', text: 'The model is 3% more accurate with income included' },
      ],
      correctId: 'b',
      explanation: 'Exponentiated logit coefficients are odds ratios. A value of 1.03 means the odds increase by a factor of 1.03 (≈3%) for each unit increase in income. This is NOT the same as a 3% increase in probability.',
    },
    {
      id: 'ch3-q3',
      question: 'What is the primary difference between the logit and probit models?',
      options: [
        { id: 'a', text: 'Logit uses MLE while probit uses OLS' },
        { id: 'b', text: 'Logit assumes a logistic distribution for errors; probit assumes a normal distribution' },
        { id: 'c', text: 'Probit can handle multiple outcomes; logit cannot' },
        { id: 'd', text: 'Logit works only for balanced datasets' },
      ],
      correctId: 'b',
      explanation: 'Both use MLE. The logit link uses the logistic CDF; the probit link uses the standard normal CDF. In practice they give very similar results. Both handle binary outcomes; multinomial extensions exist for each.',
    },
    {
      id: 'ch3-q4',
      question: 'A model has AUC = 0.92. What does this mean?',
      options: [
        { id: 'a', text: '92% of predictions are correct' },
        { id: 'b', text: 'There is a 92% chance a randomly chosen positive case ranks higher than a randomly chosen negative case' },
        { id: 'c', text: 'The false positive rate is 8%' },
        { id: 'd', text: '92% of positive cases are correctly identified' },
      ],
      correctId: 'b',
      explanation: 'AUC measures discriminative ability across all thresholds. It equals the probability that a random positive case gets a higher predicted score than a random negative case. It is NOT accuracy, recall, or 1 minus FPR.',
    },
    {
      id: 'ch3-q5',
      question: 'Your confusion matrix shows: TP=80, FP=20, FN=30, TN=870. The accuracy is 95%. Why might this be misleading?',
      options: [
        { id: 'a', text: 'Because the model has perfect precision' },
        { id: 'b', text: 'Because the classes are imbalanced — a naive "always predict negative" model would achieve 90% accuracy' },
        { id: 'c', text: 'Because AUC is always better than accuracy' },
        { id: 'd', text: 'Because the sample size is too small' },
      ],
      correctId: 'b',
      explanation: 'With 900 negatives vs 110 positives, always predicting negative gives 900/1000 = 90%. The model\'s 95% accuracy sounds impressive but only catches 80/110 ≈ 73% of positives. Precision/recall/F1 are more informative here.',
    },
  ],

  ch4: [
    {
      id: 'ch4-q1',
      question: 'Customer spending data has many zeros (non-buyers) and positive values (buyers). What best describes this data?',
      options: [
        { id: 'a', text: 'Right-censored data' },
        { id: 'b', text: 'Left-censored data at zero' },
        { id: 'c', text: 'Truncated data' },
        { id: 'd', text: 'Missing data' },
      ],
      correctId: 'b',
      explanation: 'The true "willingness to spend" might be negative for some people, but we observe zero instead — left-censoring at zero. Truncation would mean we don\'t observe the zero-spenders at all. Right-censoring is when the upper bound is limited.',
    },
    {
      id: 'ch4-q2',
      question: 'Why does OLS produce biased estimates when applied to censored data?',
      options: [
        { id: 'a', text: 'OLS cannot handle continuous variables' },
        { id: 'b', text: 'The censored observations create a mass point that distorts the conditional mean' },
        { id: 'c', text: 'OLS requires normally distributed predictors' },
        { id: 'd', text: 'OLS requires at least 1000 observations' },
      ],
      correctId: 'b',
      explanation: 'The pile-up at the censoring point (e.g., zero) means the observed distribution no longer matches the assumptions of OLS. The conditional expectation is no longer linear, and ignoring censoring attenuates coefficients toward zero.',
    },
    {
      id: 'ch4-q3',
      question: 'What is the key difference between censoring and truncation?',
      options: [
        { id: 'a', text: 'Censoring is for continuous data; truncation is for discrete data' },
        { id: 'b', text: 'With censoring we know an observation exists but not its exact value; with truncation we don\'t observe it at all' },
        { id: 'c', text: 'Truncation is a special case of censoring' },
        { id: 'd', text: 'There is no meaningful difference' },
      ],
      correctId: 'b',
      explanation: 'Censoring: we see the observation and know it\'s at the limit (e.g., spending = 0). Truncation: the observation is entirely missing from the sample (e.g., we only survey people who bought something). Truncation loses more information.',
    },
    {
      id: 'ch4-q4',
      question: 'In a Tobit model, the marginal effect of X on observed Y combines two components. What are they?',
      options: [
        { id: 'a', text: 'The slope and the intercept' },
        { id: 'b', text: 'The effect on the probability of being uncensored, and the effect on Y given it is uncensored' },
        { id: 'c', text: 'The first-stage and second-stage estimates' },
        { id: 'd', text: 'The within-group and between-group effects' },
      ],
      correctId: 'b',
      explanation: 'The unconditional marginal effect in a Tobit model has an extensive margin (probability of being uncensored) and an intensive margin (expected value given uncensored). The raw coefficient β overestimates the marginal effect on observed Y.',
    },
    {
      id: 'ch4-q5',
      question: 'A Tobit model assumes the same process determines both whether Y > 0 and the magnitude of Y. When might this assumption be problematic?',
      options: [
        { id: 'a', text: 'When the data has outliers' },
        { id: 'b', text: 'When the decision to participate and the amount spent are driven by different factors' },
        { id: 'c', text: 'When the sample size is large' },
        { id: 'd', text: 'When the censoring point is not at zero' },
      ],
      correctId: 'b',
      explanation: 'If the decision to buy (extensive margin) and how much to spend (intensive margin) are governed by different processes, the single-equation Tobit is misspecified. A Heckman selection model or two-part model may be more appropriate.',
    },
  ],

  ch5: [
    {
      id: 'ch5-q1',
      question: 'Which key assumption does Poisson regression make about the relationship between mean and variance?',
      options: [
        { id: 'a', text: 'Variance equals zero' },
        { id: 'b', text: 'Variance equals the mean (equidispersion)' },
        { id: 'c', text: 'Variance is always larger than the mean' },
        { id: 'd', text: 'Mean and variance are independent' },
      ],
      correctId: 'b',
      explanation: 'The Poisson distribution has E(Y) = Var(Y) = λ. In practice, count data often has Var(Y) > E(Y) (overdispersion), violating this assumption and requiring the negative binomial model.',
    },
    {
      id: 'ch5-q2',
      question: 'In Poisson regression, coefficients are exponentiated to get incidence rate ratios. If exp(β) = 1.25, what does this mean?',
      options: [
        { id: 'a', text: 'A one-unit increase in X increases the count by 1.25' },
        { id: 'b', text: 'A one-unit increase in X multiplies the expected count by 1.25 (a 25% increase)' },
        { id: 'c', text: 'The count increases by 25 percentage points' },
        { id: 'd', text: 'X explains 25% of the variation in counts' },
      ],
      correctId: 'b',
      explanation: 'Poisson regression uses a log link, so exp(β) is a multiplicative factor on the expected count. An IRR of 1.25 means the expected count is 25% higher for each unit increase in X.',
    },
    {
      id: 'ch5-q3',
      question: 'Your count data has many more zeros than a Poisson model predicts. Which model family is most appropriate?',
      options: [
        { id: 'a', text: 'OLS with a log-transformed dependent variable' },
        { id: 'b', text: 'Negative binomial regression' },
        { id: 'c', text: 'Zero-inflated Poisson or zero-inflated negative binomial' },
        { id: 'd', text: 'Logistic regression on a binary version of the outcome' },
      ],
      correctId: 'c',
      explanation: 'Excess zeros suggest two data-generating processes: one produces "structural" zeros (people who would never have the event) and another produces counts (including some zeros). Zero-inflated models handle both. NB handles overdispersion but not excess zeros specifically.',
    },
    {
      id: 'ch5-q4',
      question: 'You want to model insurance claims per year, but policyholders have different coverage durations. How do you handle this?',
      options: [
        { id: 'a', text: 'Divide claims by duration and use OLS' },
        { id: 'b', text: 'Include the log of duration as an offset in the Poisson regression' },
        { id: 'c', text: 'Exclude policyholders with short durations' },
        { id: 'd', text: 'Use duration as a regular predictor variable' },
      ],
      correctId: 'b',
      explanation: 'An offset fixes the coefficient of log(exposure) at 1, effectively modeling the rate rather than the raw count. Dividing and using OLS discards the count nature of the data and can produce negative predictions.',
    },
    {
      id: 'ch5-q5',
      question: 'A likelihood ratio test comparing Poisson and negative binomial models is significant (p < 0.01). What does this mean?',
      options: [
        { id: 'a', text: 'The Poisson model fits better' },
        { id: 'b', text: 'There is significant overdispersion and the negative binomial model is preferred' },
        { id: 'c', text: 'Neither model fits the data' },
        { id: 'd', text: 'The data has too many zeros' },
      ],
      correctId: 'b',
      explanation: 'The Poisson model is nested within the negative binomial (NB reduces to Poisson when the dispersion parameter α = 0). A significant LR test rejects the restriction α = 0, indicating overdispersion and preferring the NB model.',
    },
  ],

  ch6: [
    {
      id: 'ch6-q1',
      question: 'A customer subscribes on Jan 1 and is still active when the study ends on Dec 31. Their survival time is:',
      options: [
        { id: 'a', text: 'Exactly 365 days' },
        { id: 'b', text: 'Right-censored at 365 days' },
        { id: 'c', text: 'Left-censored at 365 days' },
        { id: 'd', text: 'Missing data — exclude them' },
      ],
      correctId: 'b',
      explanation: 'We know the customer survived at least 365 days, but the true churn time is unknown (it\'s in the future). This is right-censoring. Excluding censored observations would bias survival estimates downward.',
    },
    {
      id: 'ch6-q2',
      question: 'What does a hazard ratio of 1.5 for "age" in a Cox model mean?',
      options: [
        { id: 'a', text: 'Older people survive 1.5 times longer' },
        { id: 'b', text: 'A one-unit increase in age increases the instantaneous risk of the event by 50%' },
        { id: 'c', text: 'Age explains 50% of the variation in survival times' },
        { id: 'd', text: '50% of older people experience the event' },
      ],
      correctId: 'b',
      explanation: 'In a Cox model, exp(β) is the hazard ratio. HR = 1.5 means the hazard (instantaneous risk) is 50% higher for each unit increase in age, holding other covariates constant. HR > 1 means higher risk, not longer survival.',
    },
    {
      id: 'ch6-q3',
      question: 'The Kaplan-Meier estimator is non-parametric. What is its main limitation compared to the Cox model?',
      options: [
        { id: 'a', text: 'It cannot handle censored observations' },
        { id: 'b', text: 'It cannot adjust for covariates — it estimates survival for a group, not conditional on predictors' },
        { id: 'c', text: 'It assumes a specific distribution for survival times' },
        { id: 'd', text: 'It requires very large sample sizes' },
      ],
      correctId: 'b',
      explanation: 'Kaplan-Meier handles censoring well but only estimates the overall survival curve (or for subgroups). It cannot model how multiple covariates simultaneously affect survival. The Cox model allows covariate adjustment.',
    },
    {
      id: 'ch6-q4',
      question: 'The Cox model makes a "proportional hazards" assumption. What does this mean?',
      options: [
        { id: 'a', text: 'The hazard function is constant over time' },
        { id: 'b', text: 'The ratio of hazards between any two individuals is constant over time' },
        { id: 'c', text: 'All individuals have the same baseline hazard' },
        { id: 'd', text: 'Survival times follow a proportional distribution' },
      ],
      correctId: 'b',
      explanation: 'Proportional hazards means the hazard ratio between two covariate patterns does not change over time. The hazard itself can vary freely over time (captured by h₀(t)), but the multiplicative effect of covariates is time-invariant.',
    },
    {
      id: 'ch6-q5',
      question: 'You run a log-rank test comparing survival curves of two treatment groups and get p = 0.03. What can you conclude?',
      options: [
        { id: 'a', text: 'Treatment A causes longer survival than Treatment B' },
        { id: 'b', text: 'The survival distributions of the two groups are significantly different' },
        { id: 'c', text: 'The proportional hazards assumption holds' },
        { id: 'd', text: 'The median survival times are equal' },
      ],
      correctId: 'b',
      explanation: 'The log-rank test compares overall survival distributions; it rejects the null that they are equal. It does not establish causation (that requires experimental design), nor does it test proportional hazards.',
    },
  ],

  ch7: [
    {
      id: 'ch7-q1',
      question: 'When should you use a multinomial logit model instead of binary logistic regression?',
      options: [
        { id: 'a', text: 'When the dependent variable has ordered categories' },
        { id: 'b', text: 'When the dependent variable has three or more unordered categories' },
        { id: 'c', text: 'When you have more than two predictors' },
        { id: 'd', text: 'When the sample size exceeds 10,000' },
      ],
      correctId: 'b',
      explanation: 'MNL extends logistic regression to unordered multi-category outcomes (e.g., brand choice among 5 brands). Ordered outcomes call for ordered logit/probit. The number of predictors or sample size doesn\'t determine the model family.',
    },
    {
      id: 'ch7-q2',
      question: 'The IIA property states that the ratio of choice probabilities between two alternatives is independent of other alternatives. Why is this problematic?',
      options: [
        { id: 'a', text: 'It makes the model too complex to estimate' },
        { id: 'b', text: 'It implies adding a close substitute to the choice set steals equally from all options, even dissimilar ones' },
        { id: 'c', text: 'It prevents the model from converging' },
        { id: 'd', text: 'It requires balanced choice frequencies' },
      ],
      correctId: 'b',
      explanation: 'The classic "red bus / blue bus" problem: adding a blue bus should mainly steal riders from the red bus, not from the train. But IIA forces proportional substitution from all alternatives. Nested or mixed logit relax this.',
    },
    {
      id: 'ch7-q3',
      question: 'How does the nested logit model relax the IIA assumption?',
      options: [
        { id: 'a', text: 'By removing alternatives from the choice set' },
        { id: 'b', text: 'By grouping similar alternatives into nests and allowing correlated errors within nests' },
        { id: 'c', text: 'By using OLS instead of MLE' },
        { id: 'd', text: 'By adding interaction terms between alternatives' },
      ],
      correctId: 'b',
      explanation: 'Nested logit partitions alternatives into groups (nests) where substitution within a nest can be stronger than across nests. IIA holds within each nest but not across the full choice set, better reflecting real substitution patterns.',
    },
    {
      id: 'ch7-q4',
      question: 'In the random utility framework, an individual chooses the alternative that maximizes U_j = V_j + ε_j. What does V_j represent?',
      options: [
        { id: 'a', text: 'The total utility including randomness' },
        { id: 'b', text: 'The systematic (observable) component of utility' },
        { id: 'c', text: 'The error term' },
        { id: 'd', text: 'The budget constraint' },
      ],
      correctId: 'b',
      explanation: 'V_j = Xβ is the deterministic part of utility that we model using observed attributes and estimated parameters. ε_j captures unobserved factors. Different distributional assumptions on ε lead to logit, probit, or other models.',
    },
    {
      id: 'ch7-q5',
      question: 'The Hausman-McFadden test for IIA removes one alternative and re-estimates the MNL. If the test is significant, what does it suggest?',
      options: [
        { id: 'a', text: 'The removed alternative was unimportant' },
        { id: 'b', text: 'IIA holds and MNL is appropriate' },
        { id: 'c', text: 'IIA is violated and you should consider nested or mixed logit' },
        { id: 'd', text: 'The model has multicollinearity' },
      ],
      correctId: 'c',
      explanation: 'Under IIA, removing an alternative should not change coefficient estimates. If it does (significant test), IIA is violated and the MNL\'s proportional substitution is unrealistic — consider nested logit or mixed logit.',
    },
  ],

  ch8: [
    {
      id: 'ch8-q1',
      question: 'Endogeneity occurs when a regressor is correlated with the error term. Which of these is NOT a common cause?',
      options: [
        { id: 'a', text: 'Omitted variable bias' },
        { id: 'b', text: 'Measurement error in X' },
        { id: 'c', text: 'Multicollinearity among predictors' },
        { id: 'd', text: 'Simultaneity (reverse causation)' },
      ],
      correctId: 'c',
      explanation: 'Multicollinearity inflates standard errors but does not cause correlation between X and ε — OLS remains unbiased. Omitted variables, measurement error, and simultaneity all create endogeneity and bias OLS.',
    },
    {
      id: 'ch8-q2',
      question: 'A valid instrument Z must satisfy two conditions. Which pair is correct?',
      options: [
        { id: 'a', text: 'Z is correlated with Y, and Z is uncorrelated with X' },
        { id: 'b', text: 'Z is correlated with the endogenous X (relevance), and Z affects Y only through X (exclusion restriction)' },
        { id: 'c', text: 'Z is uncorrelated with both X and ε' },
        { id: 'd', text: 'Z is correlated with ε but not with X' },
      ],
      correctId: 'b',
      explanation: 'Relevance: Cov(Z, X) ≠ 0 (Z predicts X). Exclusion: Cov(Z, ε) = 0 (Z has no direct effect on Y except through X). Relevance is testable via the first-stage F-statistic; exclusion is not directly testable with exact identification.',
    },
    {
      id: 'ch8-q3',
      question: 'In 2SLS, what happens in the first stage?',
      options: [
        { id: 'a', text: 'Y is regressed on X to get residuals' },
        { id: 'b', text: 'The endogenous X is regressed on the instrument Z (and other exogenous variables) to get predicted values of X' },
        { id: 'c', text: 'The instrument Z is tested for normality' },
        { id: 'd', text: 'Outliers are removed from the dataset' },
      ],
      correctId: 'b',
      explanation: 'The first stage isolates the variation in X that is driven by the instrument Z (the exogenous part). The second stage uses these predicted values X̂ in place of actual X, removing the endogenous contamination.',
    },
    {
      id: 'ch8-q4',
      question: 'A first-stage F-statistic of 4.2 is concerning because:',
      options: [
        { id: 'a', text: 'The model has too many variables' },
        { id: 'b', text: 'It falls below the rule-of-thumb threshold of ~10, indicating a weak instrument' },
        { id: 'c', text: 'The second stage will have too many degrees of freedom' },
        { id: 'd', text: 'The instrument is too strongly correlated with X' },
      ],
      correctId: 'b',
      explanation: 'A weak instrument (low first-stage F) means Z barely predicts X. This leads to biased and imprecise 2SLS estimates that can be worse than OLS. The Staiger-Stock rule of thumb requires F > 10.',
    },
    {
      id: 'ch8-q5',
      question: 'The Hausman test compares OLS and IV (2SLS) estimates. If the test is NOT significant, what is the practical implication?',
      options: [
        { id: 'a', text: 'The instrument is invalid' },
        { id: 'b', text: 'You should use IV because it is always more robust' },
        { id: 'c', text: 'There is no statistical evidence of endogeneity, so OLS is preferred for its efficiency' },
        { id: 'd', text: 'Both estimators are biased' },
      ],
      correctId: 'c',
      explanation: 'If OLS and IV estimates don\'t differ significantly, the endogeneity problem may be negligible. Since IV is always less efficient (larger standard errors) than OLS, you prefer OLS when endogeneity is not detected.',
    },
  ],

  ch9: [
    {
      id: 'ch9-q1',
      question: 'K-means clustering requires you to specify K in advance. Which method helps choose K?',
      options: [
        { id: 'a', text: 'The Hausman test' },
        { id: 'b', text: 'The elbow method — plot within-cluster sum of squares against K and look for the "bend"' },
        { id: 'c', text: 'Cross-validation with a test set' },
        { id: 'd', text: 'AIC / BIC criteria' },
      ],
      correctId: 'b',
      explanation: 'The elbow method plots total within-cluster variance (WCSS) against K. The "elbow" is where adding another cluster yields diminishing returns. Silhouette analysis is another option. The Hausman test is for endogeneity, not clustering.',
    },
    {
      id: 'ch9-q2',
      question: 'Which clustering method can identify clusters of arbitrary shape and automatically detect outliers?',
      options: [
        { id: 'a', text: 'K-means' },
        { id: 'b', text: 'Hierarchical clustering with Ward\'s linkage' },
        { id: 'c', text: 'DBSCAN' },
        { id: 'd', text: 'K-medoids' },
      ],
      correctId: 'c',
      explanation: 'DBSCAN groups points by density. It finds arbitrarily shaped clusters and labels low-density points as noise (outliers). K-means assumes spherical clusters; hierarchical methods are shape-constrained by the linkage criterion.',
    },
    {
      id: 'ch9-q3',
      question: 'A silhouette score close to +1 for an observation means:',
      options: [
        { id: 'a', text: 'The observation is an outlier' },
        { id: 'b', text: 'The observation is well-matched to its own cluster and poorly matched to neighboring clusters' },
        { id: 'c', text: 'The observation is equidistant from all clusters' },
        { id: 'd', text: 'The number of clusters is too large' },
      ],
      correctId: 'b',
      explanation: 's(i) = (b(i) - a(i)) / max(a(i), b(i)), where a(i) is the average distance to same-cluster points and b(i) to nearest other cluster. Near +1 means a(i) ≪ b(i): tight within, far from others. Near 0 means it\'s on a cluster boundary.',
    },
    {
      id: 'ch9-q4',
      question: 'You run K-means 10 times with K=3 and get different results each time. Why?',
      options: [
        { id: 'a', text: 'The data has outliers' },
        { id: 'b', text: 'K-means uses random initial centroids and may converge to different local optima' },
        { id: 'c', text: 'K=3 is the wrong number of clusters' },
        { id: 'd', text: 'The features are not standardized' },
      ],
      correctId: 'b',
      explanation: 'K-means is sensitive to initialization. Different starting centroids can converge to different local minima of the objective function. Running it multiple times (or using K-means++) and choosing the best result is standard practice.',
    },
    {
      id: 'ch9-q5',
      question: 'In hierarchical clustering, Ward\'s linkage minimizes:',
      options: [
        { id: 'a', text: 'The maximum distance between clusters' },
        { id: 'b', text: 'The minimum distance between clusters' },
        { id: 'c', text: 'The increase in total within-cluster variance when merging two clusters' },
        { id: 'd', text: 'The number of clusters at each step' },
      ],
      correctId: 'c',
      explanation: 'Ward\'s method merges the pair of clusters that causes the smallest increase in total within-cluster sum of squares, producing compact, similarly-sized clusters. Single linkage uses minimum distance (prone to chaining); complete linkage uses maximum distance.',
    },
  ],

  ch10: [
    {
      id: 'ch10-q1',
      question: 'What is the purpose of removing stop words in text preprocessing?',
      options: [
        { id: 'a', text: 'To reduce the vocabulary size by removing common words that carry little meaning' },
        { id: 'b', text: 'To correct spelling errors' },
        { id: 'c', text: 'To convert text to lowercase' },
        { id: 'd', text: 'To identify named entities' },
      ],
      correctId: 'a',
      explanation: 'Stop words ("the", "is", "at") appear frequently in all documents and rarely distinguish topics. Removing them reduces dimensionality and noise. Lowercasing is a separate step; spell-checking and NER are different tasks entirely.',
    },
    {
      id: 'ch10-q2',
      question: 'A word appears 5 times in a document but in 90% of all documents. What would TF-IDF assign it?',
      options: [
        { id: 'a', text: 'A high score because of high term frequency' },
        { id: 'b', text: 'A low score because the IDF component heavily down-weights words that appear in many documents' },
        { id: 'c', text: 'A score of exactly zero' },
        { id: 'd', text: 'The score depends only on document length' },
      ],
      correctId: 'b',
      explanation: 'TF-IDF = TF × log(N/df). High TF (5 occurrences) pushes the score up, but appearing in 90% of documents makes IDF ≈ log(1/0.9) very small. The word is common and uninformative, so TF-IDF correctly assigns a low weight.',
    },
    {
      id: 'ch10-q3',
      question: 'In the Bag of Words representation, what information is lost?',
      options: [
        { id: 'a', text: 'Word frequency' },
        { id: 'b', text: 'Document length' },
        { id: 'c', text: 'Word order and grammar' },
        { id: 'd', text: 'Vocabulary size' },
      ],
      correctId: 'c',
      explanation: 'Bag of Words treats a document as an unordered collection of word counts, discarding sequence, grammar, and context. "Dog bites man" and "Man bites dog" have identical BoW representations despite opposite meanings.',
    },
    {
      id: 'ch10-q4',
      question: 'LDA (Latent Dirichlet Allocation) assumes each document is:',
      options: [
        { id: 'a', text: 'About exactly one topic' },
        { id: 'b', text: 'A mixture of topics, with each word drawn from one of the document\'s topics' },
        { id: 'c', text: 'Classified into a predefined category' },
        { id: 'd', text: 'Represented as a single TF-IDF vector' },
      ],
      correctId: 'b',
      explanation: 'LDA is a generative model: each document has a distribution over topics, and each topic has a distribution over words. A document about "sports business" mixes the "sports" and "business" topics. This is unsupervised — no predefined categories.',
    },
    {
      id: 'ch10-q5',
      question: 'Two document vectors have a cosine similarity of 0.95. What does this tell you?',
      options: [
        { id: 'a', text: 'The documents share 95% of their words' },
        { id: 'b', text: 'The documents have nearly identical word-usage patterns regardless of length differences' },
        { id: 'c', text: 'The documents have the same number of words' },
        { id: 'd', text: 'One document is a subset of the other' },
      ],
      correctId: 'b',
      explanation: 'Cosine similarity measures the angle between vectors, ignoring magnitude (length). A value near 1 means the word distributions point in nearly the same direction — very similar content — even if one document is much longer than the other.',
    },
  ],

  ch11: [
    {
      id: 'ch11-q1',
      question: 'What problem does the ReLU activation function solve compared to sigmoid for deep networks?',
      options: [
        { id: 'a', text: 'ReLU produces probabilities between 0 and 1' },
        { id: 'b', text: 'ReLU mitigates the vanishing gradient problem because its derivative is 1 for positive inputs' },
        { id: 'c', text: 'ReLU is differentiable everywhere' },
        { id: 'd', text: 'ReLU guarantees convergence' },
      ],
      correctId: 'b',
      explanation: 'Sigmoid squashes outputs to (0,1), and its gradient approaches zero for large |z| (vanishing gradients). ReLU has gradient = 1 for z > 0, allowing gradients to flow through deep layers. ReLU is not differentiable at z = 0 (but this is rarely a practical issue).',
    },
    {
      id: 'ch11-q2',
      question: 'In backpropagation, what quantity is propagated backward through the network?',
      options: [
        { id: 'a', text: 'The input features' },
        { id: 'b', text: 'The predicted outputs' },
        { id: 'c', text: 'The gradient of the loss function with respect to each weight' },
        { id: 'd', text: 'The learning rate' },
      ],
      correctId: 'c',
      explanation: 'Backpropagation uses the chain rule to compute ∂L/∂w for every weight, starting from the output layer and moving backward. These gradients tell the optimizer how to adjust each weight to reduce the loss.',
    },
    {
      id: 'ch11-q3',
      question: 'A neural network with one hidden layer of 500 neurons perfectly fits the training data but performs poorly on test data. This is most likely:',
      options: [
        { id: 'a', text: 'Underfitting' },
        { id: 'b', text: 'Overfitting — the model memorized training noise' },
        { id: 'c', text: 'A sign that more hidden layers are needed' },
        { id: 'd', text: 'Caused by a low learning rate' },
      ],
      correctId: 'b',
      explanation: 'High training accuracy + low test accuracy = overfitting. The model has too much capacity relative to the data and memorizes noise. Remedies include regularization (L2, dropout), early stopping, or more training data — not more capacity.',
    },
    {
      id: 'ch11-q4',
      question: 'Cross-entropy loss is preferred over MSE for classification because:',
      options: [
        { id: 'a', text: 'It is computationally cheaper' },
        { id: 'b', text: 'It produces stronger gradients when the prediction is confidently wrong, enabling faster learning' },
        { id: 'c', text: 'It does not require the sigmoid function' },
        { id: 'd', text: 'It is always smaller than MSE' },
      ],
      correctId: 'b',
      explanation: 'When a sigmoid output is near 0 or 1, MSE gradients are tiny (σ\'(z) ≈ 0), causing slow learning. Cross-entropy\'s gradient is proportional to (ŷ - y), giving large updates for confident wrong predictions — exactly when learning matters most.',
    },
    {
      id: 'ch11-q5',
      question: 'The universal approximation theorem states that a neural network with a single hidden layer can approximate any continuous function. Why is this NOT a guarantee of practical success?',
      options: [
        { id: 'a', text: 'The theorem only applies to classification, not regression' },
        { id: 'b', text: 'The required number of neurons may be impractically large, and finding the right weights via gradient descent is not guaranteed' },
        { id: 'c', text: 'The theorem requires ReLU activation specifically' },
        { id: 'd', text: 'The theorem has been disproven' },
      ],
      correctId: 'b',
      explanation: 'The theorem is an existence result: a sufficiently wide network CAN represent the function, but it doesn\'t say how many neurons are needed or that SGD will find the right weights. In practice, deep networks generalize better than extremely wide shallow ones.',
    },
  ],

  ch12: [
    {
      id: 'ch12-q1',
      question: 'What is the primary advantage of convolutional layers over fully connected layers for image data?',
      options: [
        { id: 'a', text: 'They are faster to compute' },
        { id: 'b', text: 'They exploit spatial structure through parameter sharing and local connectivity, drastically reducing parameters' },
        { id: 'c', text: 'They can only process color images' },
        { id: 'd', text: 'They do not require activation functions' },
      ],
      correctId: 'b',
      explanation: 'A filter slides across the image, sharing weights at every position (translation equivariance). A fully connected layer for a 224×224 image would need ~150K parameters per neuron; a 3×3 conv filter needs just 9. This also provides built-in translation invariance.',
    },
    {
      id: 'ch12-q2',
      question: 'What problem do LSTMs solve that vanilla RNNs struggle with?',
      options: [
        { id: 'a', text: 'Processing variable-length sequences' },
        { id: 'b', text: 'Learning long-range dependencies by mitigating the vanishing gradient problem' },
        { id: 'c', text: 'Parallel processing of sequence elements' },
        { id: 'd', text: 'Reducing the number of parameters' },
      ],
      correctId: 'b',
      explanation: 'Vanilla RNNs lose information over long sequences as gradients vanish during backpropagation through time. LSTMs use gating mechanisms (forget, input, output gates) to control information flow, enabling learning of dependencies spanning hundreds of time steps.',
    },
    {
      id: 'ch12-q3',
      question: 'Dropout randomly sets neurons to zero during training. Why does this prevent overfitting?',
      options: [
        { id: 'a', text: 'It reduces the number of parameters' },
        { id: 'b', text: 'It forces the network to learn redundant representations, acting as an ensemble of sub-networks' },
        { id: 'c', text: 'It increases the learning rate automatically' },
        { id: 'd', text: 'It removes outliers from the training data' },
      ],
      correctId: 'b',
      explanation: 'With dropout, no neuron can rely on specific other neurons, preventing co-adaptation. Each training step uses a different sub-network. At test time (no dropout), the full network acts like an average of these sub-networks — effectively an ensemble.',
    },
    {
      id: 'ch12-q4',
      question: 'Transfer learning reuses a pre-trained model for a new task. Which layers are typically frozen?',
      options: [
        { id: 'a', text: 'The final classification layer' },
        { id: 'b', text: 'The early layers that learn general features (edges, textures), while fine-tuning later task-specific layers' },
        { id: 'c', text: 'All layers are always frozen' },
        { id: 'd', text: 'Randomly selected layers' },
      ],
      correctId: 'b',
      explanation: 'Early CNN layers learn generic features (edges, corners, textures) useful across tasks. Later layers learn task-specific features. By freezing early layers and fine-tuning later ones, you leverage general knowledge while adapting to the new domain with less data.',
    },
    {
      id: 'ch12-q5',
      question: 'Batch normalization normalizes activations within each mini-batch. What is its primary benefit during training?',
      options: [
        { id: 'a', text: 'It eliminates the need for activation functions' },
        { id: 'b', text: 'It reduces internal covariate shift, allowing higher learning rates and faster convergence' },
        { id: 'c', text: 'It guarantees the model will not overfit' },
        { id: 'd', text: 'It makes the network invariant to input scaling' },
      ],
      correctId: 'b',
      explanation: 'As earlier layers update, the distribution of inputs to later layers shifts (internal covariate shift). Batch norm stabilizes these distributions, enabling higher learning rates without divergence and acting as a mild regularizer.',
    },
  ],
}
