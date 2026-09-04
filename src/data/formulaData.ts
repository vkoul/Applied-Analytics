export interface Formula {
  id: string
  name: string
  tex: string
  description: string
  chapter: string
  category: string
}

export const formulaData: Formula[] = [
  // Linear Models
  { id: 'ols-estimator', name: 'OLS Estimator', tex: '\\hat{\\beta} = (X\'X)^{-1}X\'y', description: 'The closed-form solution for OLS regression coefficients. Minimizes the sum of squared residuals.', chapter: 'ch2', category: 'Linear Models' },
  { id: 'r-squared', name: 'R-Squared', tex: 'R^2 = 1 - \\frac{SS_{res}}{SS_{tot}}', description: 'Proportion of variance in the dependent variable explained by the model. Ranges from 0 to 1.', chapter: 'ch2', category: 'Linear Models' },
  { id: 'adj-r-squared', name: 'Adjusted R-Squared', tex: '\\bar{R}^2 = 1 - \\frac{(1-R^2)(n-1)}{n-k-1}', description: 'R-squared adjusted for the number of predictors. Penalizes model complexity.', chapter: 'ch2', category: 'Linear Models' },
  { id: 'vif-formula', name: 'Variance Inflation Factor', tex: 'VIF_j = \\frac{1}{1 - R_j^2}', description: 'Measures how much the variance of a coefficient is inflated by multicollinearity. VIF > 10 suggests a problem.', chapter: 'ch2', category: 'Linear Models' },
  { id: 'f-statistic', name: 'F-Statistic', tex: 'F = \\frac{(SS_{tot} - SS_{res})/k}{SS_{res}/(n-k-1)}', description: 'Tests whether all regression coefficients are jointly zero. Large F rejects the null that the model has no explanatory power.', chapter: 'ch2', category: 'Linear Models' },
  { id: 'aic-formula', name: 'Akaike Information Criterion', tex: 'AIC = 2k - 2\\ln(\\hat{L})', description: 'Model selection criterion balancing fit and complexity. Lower AIC is better. k = number of parameters.', chapter: 'ch2', category: 'Linear Models' },
  { id: 'bic-formula', name: 'Bayesian Information Criterion', tex: 'BIC = k\\ln(n) - 2\\ln(\\hat{L})', description: 'Similar to AIC but penalizes model complexity more heavily. Preferred for consistent model selection.', chapter: 'ch2', category: 'Linear Models' },

  // Binary Response
  { id: 'logit-probability', name: 'Logistic Probability', tex: 'P(Y=1|X) = \\frac{1}{1 + e^{-X\\beta}}', description: 'The probability of a positive outcome in logistic regression. Maps the linear predictor to [0,1] via the sigmoid function.', chapter: 'ch3', category: 'Binary Response' },
  { id: 'log-odds', name: 'Log-Odds (Logit)', tex: '\\ln\\frac{p}{1-p} = X\\beta', description: 'The natural log of the odds. In logistic regression, this is a linear function of the predictors.', chapter: 'ch3', category: 'Binary Response' },
  { id: 'probit-probability', name: 'Probit Probability', tex: 'P(Y=1|X) = \\Phi(X\\beta)', description: 'The probability in a probit model, using the standard normal CDF. Similar to logit but with slightly thinner tails.', chapter: 'ch3', category: 'Binary Response' },
  { id: 'odds-ratio-formula', name: 'Odds Ratio', tex: 'OR = e^{\\beta_j}', description: 'The multiplicative change in odds for a one-unit increase in predictor j. OR > 1 means higher odds of the event.', chapter: 'ch3', category: 'Binary Response' },
  { id: 'log-likelihood', name: 'Binary Log-Likelihood', tex: '\\ell(\\beta) = \\sum_{i=1}^{n}[y_i\\ln(p_i) + (1-y_i)\\ln(1-p_i)]', description: 'The log-likelihood function for binary models. MLE finds the beta that maximizes this.', chapter: 'ch3', category: 'Binary Response' },

  // Censored Data
  { id: 'tobit-model', name: 'Tobit Model', tex: 'y_i^* = X_i\\beta + \\epsilon_i, \\quad y_i = \\max(0, y_i^*)', description: 'A latent variable model for censored data. The observed y is the latent y* truncated at zero.', chapter: 'ch4', category: 'Censored Data' },
  { id: 'tobit-likelihood', name: 'Tobit Likelihood', tex: 'L = \\prod_{y_i=0}\\left[1 - \\Phi\\left(\\frac{X_i\\beta}{\\sigma}\\right)\\right] \\prod_{y_i>0}\\frac{1}{\\sigma}\\phi\\left(\\frac{y_i - X_i\\beta}{\\sigma}\\right)', description: 'Censored observations contribute the probability of being at the boundary; uncensored contribute the density.', chapter: 'ch4', category: 'Censored Data' },

  // Count Data
  { id: 'poisson-pmf', name: 'Poisson PMF', tex: 'P(Y=k) = \\frac{e^{-\\lambda}\\lambda^k}{k!}', description: 'Probability mass function for Poisson distribution. Lambda is both the mean and variance.', chapter: 'ch5', category: 'Count Data' },
  { id: 'poisson-regression-link', name: 'Poisson Regression', tex: '\\ln(\\lambda_i) = X_i\\beta', description: 'Log link connects the linear predictor to the mean count. Coefficients represent log-rate ratios.', chapter: 'ch5', category: 'Count Data' },
  { id: 'overdispersion-test', name: 'Overdispersion Check', tex: '\\text{Var}(Y) > E(Y) \\implies \\text{overdispersion}', description: 'When variance exceeds the mean, the Poisson assumption is violated. Use negative binomial instead.', chapter: 'ch5', category: 'Count Data' },
  { id: 'irr-formula', name: 'Incidence Rate Ratio', tex: 'IRR = e^{\\beta_j}', description: 'Multiplicative change in the expected count for a one-unit increase in predictor j.', chapter: 'ch5', category: 'Count Data' },

  // Survival
  { id: 'survival-function', name: 'Survival Function', tex: 'S(t) = P(T > t) = 1 - F(t)', description: 'Probability of surviving beyond time t. Monotonically decreasing from 1 to 0.', chapter: 'ch6', category: 'Survival Analysis' },
  { id: 'hazard-function', name: 'Hazard Function', tex: 'h(t) = \\lim_{\\Delta t \\to 0} \\frac{P(t \\le T < t+\\Delta t | T \\ge t)}{\\Delta t}', description: 'Instantaneous rate of failure at time t, conditional on survival to t. Not a probability.', chapter: 'ch6', category: 'Survival Analysis' },
  { id: 'hazard-survival-relation', name: 'Hazard-Survival Relation', tex: 'h(t) = -\\frac{d}{dt}\\ln S(t)', description: 'The hazard is the negative derivative of the log-survival function. They encode the same information.', chapter: 'ch6', category: 'Survival Analysis' },
  { id: 'cox-model-formula', name: 'Cox PH Model', tex: 'h(t|X) = h_0(t)\\exp(X\\beta)', description: 'Semi-parametric model where covariates multiplicatively shift the baseline hazard. No distributional assumption needed.', chapter: 'ch6', category: 'Survival Analysis' },
  { id: 'hazard-ratio-formula', name: 'Hazard Ratio', tex: 'HR = \\exp(\\beta_j)', description: 'Multiplicative change in hazard for a one-unit increase in covariate j. HR > 1 means higher risk.', chapter: 'ch6', category: 'Survival Analysis' },

  // Discrete Choice
  { id: 'mnl-probability', name: 'MNL Choice Probability', tex: 'P(i|J) = \\frac{e^{V_i}}{\\sum_{j=1}^{J}e^{V_j}}', description: 'Probability of choosing alternative i from J options. Softmax of the utility values.', chapter: 'ch7', category: 'Discrete Choice' },
  { id: 'random-utility', name: 'Random Utility', tex: 'U_{ij} = V_{ij} + \\epsilon_{ij}', description: 'Utility is deterministic part V plus random part epsilon. The individual chooses the alternative with highest total utility.', chapter: 'ch7', category: 'Discrete Choice' },
  { id: 'iia-property', name: 'IIA Property', tex: '\\frac{P(i)}{P(j)} \\text{ is independent of other alternatives}', description: 'The odds ratio between any two alternatives is unaffected by adding or removing a third. A strong (often unrealistic) assumption.', chapter: 'ch7', category: 'Discrete Choice' },

  // Instrumental Variables
  { id: 'iv-estimator', name: 'IV Estimator', tex: '\\hat{\\beta}_{IV} = (Z\'X)^{-1}Z\'Y', description: 'Consistent estimator when X is endogenous. Z must be correlated with X (relevance) but not with epsilon (exclusion).', chapter: 'ch8', category: 'Instrumental Variables' },
  { id: 'first-stage-eq', name: '2SLS First Stage', tex: 'X = Z\\pi + v', description: 'Regress endogenous X on instrument Z. Predicted values isolate the exogenous variation in X.', chapter: 'ch8', category: 'Instrumental Variables' },
  { id: 'second-stage-eq', name: '2SLS Second Stage', tex: 'Y = \\hat{X}\\beta + u', description: 'Regress Y on the predicted X from the first stage. This produces consistent estimates of beta.', chapter: 'ch8', category: 'Instrumental Variables' },

  // Clustering
  { id: 'kmeans-objective', name: 'K-Means Objective', tex: '\\min \\sum_{k=1}^{K}\\sum_{x_i \\in C_k}\\|x_i - \\mu_k\\|^2', description: 'Minimize within-cluster sum of squared distances to centroids. NP-hard in general; solved by iterative algorithm.', chapter: 'ch9', category: 'Clustering' },
  { id: 'silhouette-formula', name: 'Silhouette Coefficient', tex: 's(i) = \\frac{b(i) - a(i)}{\\max(a(i), b(i))}', description: 'Measures how similar a point is to its own cluster vs. the nearest other cluster. Ranges from -1 to 1; higher is better.', chapter: 'ch9', category: 'Clustering' },
  { id: 'euclidean-distance-formula', name: 'Euclidean Distance', tex: 'd(x, y) = \\sqrt{\\sum_{i=1}^{p}(x_i - y_i)^2}', description: 'Straight-line distance in p-dimensional space. The default distance metric for most clustering algorithms.', chapter: 'ch9', category: 'Clustering' },

  // Text Mining
  { id: 'tfidf-formula', name: 'TF-IDF', tex: '\\text{tfidf}(t,d) = \\text{tf}(t,d) \\times \\log\\frac{N}{df(t)}', description: 'Weights a term by how often it appears in a document (TF) discounted by how common it is across all documents (IDF).', chapter: 'ch10', category: 'Text Mining' },
  { id: 'cosine-similarity-formula', name: 'Cosine Similarity', tex: '\\cos(\\theta) = \\frac{A \\cdot B}{\\|A\\|\\|B\\|}', description: 'Measures the angle between two document vectors. 1 = identical direction, 0 = orthogonal (unrelated).', chapter: 'ch10', category: 'Text Mining' },

  // Neural Networks
  { id: 'perceptron-formula', name: 'Perceptron', tex: 'y = f\\left(\\sum_{i}w_ix_i + b\\right)', description: 'A single neuron: weighted sum of inputs plus bias, passed through an activation function.', chapter: 'ch11', category: 'Neural Networks' },
  { id: 'sigmoid-formula', name: 'Sigmoid Function', tex: '\\sigma(z) = \\frac{1}{1 + e^{-z}}', description: 'Maps any real value to (0,1). Used as an activation function and in logistic regression output.', chapter: 'ch11', category: 'Neural Networks' },
  { id: 'relu-formula', name: 'ReLU', tex: 'f(z) = \\max(0, z)', description: 'Rectified Linear Unit. Zero for negative inputs, identity for positive. Most popular hidden-layer activation.', chapter: 'ch11', category: 'Neural Networks' },
  { id: 'cross-entropy-formula', name: 'Binary Cross-Entropy', tex: 'L = -\\sum[y\\ln(\\hat{y}) + (1-y)\\ln(1-\\hat{y})]', description: 'Standard loss function for binary classification. Penalizes confident wrong predictions heavily.', chapter: 'ch11', category: 'Neural Networks' },
  { id: 'weight-update', name: 'Gradient Descent Update', tex: 'w \\leftarrow w - \\alpha\\frac{\\partial L}{\\partial w}', description: 'Update weights in the direction that reduces the loss. Alpha is the learning rate controlling step size.', chapter: 'ch11', category: 'Neural Networks' },

  // Deep Learning
  { id: 'convolution-formula', name: 'Discrete Convolution', tex: '(f * g)(t) = \\sum_{\\tau}f(\\tau)g(t - \\tau)', description: 'Slides a filter over the input, computing element-wise products. Extracts local features like edges and textures.', chapter: 'ch12', category: 'Deep Learning' },
  { id: 'lstm-forget-gate', name: 'LSTM Forget Gate', tex: 'f_t = \\sigma(W_f \\cdot [h_{t-1}, x_t] + b_f)', description: 'Controls what information to discard from the cell state. Sigmoid output: 0 = forget completely, 1 = keep everything.', chapter: 'ch12', category: 'Deep Learning' },
  { id: 'dropout-formula', name: 'Dropout', tex: '\\hat{y} = f(W \\cdot (m \\odot x) + b), \\quad m_i \\sim \\text{Bernoulli}(p)', description: 'Randomly zeros out neurons during training with probability (1-p). Prevents co-adaptation and reduces overfitting.', chapter: 'ch12', category: 'Deep Learning' },
]
