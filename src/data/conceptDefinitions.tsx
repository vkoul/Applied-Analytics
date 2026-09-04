import { type ReactNode } from 'react'
import { MathBlock } from '../components/content/MathBlock'

export interface ConceptDefinition {
  id: string
  displayName: string
  shortDefinition: string
  content: ReactNode
  prerequisites: string[]
  chapterOrigin: string
  category: string
}

const concepts: Record<string, ConceptDefinition> = {

  // ── Foundations ──────────────────────────────────────────────

  'regression': {
    id: 'regression',
    displayName: 'Regression',
    shortDefinition: 'A statistical method for modeling the relationship between a dependent variable and one or more independent variables.',
    content: (
      <div className="space-y-2">
        <p>Regression analysis estimates how a response variable (Y) changes as one or more predictor variables (X) change. The simplest form is linear regression, which fits a straight line through the data:</p>
        <MathBlock tex="Y = \beta_0 + \beta_1 X_1 + \beta_2 X_2 + \cdots + \beta_k X_k + \epsilon" display />
        <p>The coefficients tell you the average change in Y for a one-unit change in X, holding other variables constant. Regression is the foundation of most analytical models — logistic regression, Poisson regression, and even neural networks extend or generalize this core idea.</p>
      </div>
    ),
    prerequisites: [],
    chapterOrigin: 'ch1',
    category: 'foundations',
  },

  'cross-sectional-data': {
    id: 'cross-sectional-data',
    displayName: 'Cross-Sectional Data',
    shortDefinition: 'Observations on multiple entities collected at a single point in time.',
    content: (
      <div className="space-y-2">
        <p>Cross-sectional data captures a snapshot across many individuals, firms, or units at one point in time. For example, a survey of 1,000 customers' satisfaction scores collected today is cross-sectional.</p>
        <p>Because there is no time dimension, you cannot observe how individual entities change over time. This limits causal inference — you can identify correlations but cannot easily distinguish cause from effect without additional assumptions or techniques like instrumental variables.</p>
      </div>
    ),
    prerequisites: [],
    chapterOrigin: 'ch1',
    category: 'foundations',
  },

  'time-series-data': {
    id: 'time-series-data',
    displayName: 'Time Series Data',
    shortDefinition: 'Observations on a single entity recorded at successive time points.',
    content: (
      <div className="space-y-2">
        <p>Time series data tracks one unit over multiple time periods — for example, monthly sales for a store over 5 years. The observations are ordered in time and often exhibit trends, seasonality, and autocorrelation (where today's value depends on yesterday's).</p>
        <p>Standard regression assumes independent observations. Since time series data violates this, special techniques like ARIMA, exponential smoothing, or lagged variables are needed to avoid biased standard errors and misleading inference.</p>
      </div>
    ),
    prerequisites: [],
    chapterOrigin: 'ch1',
    category: 'foundations',
  },

  'panel-data': {
    id: 'panel-data',
    displayName: 'Panel Data',
    shortDefinition: 'Data that tracks multiple entities over multiple time periods.',
    content: (
      <div className="space-y-2">
        <p>Panel data (also called longitudinal data) combines cross-sectional and time-series dimensions. You observe many entities (customers, firms, countries) across several time periods. For example, quarterly revenue for 200 stores over 3 years.</p>
        <p>Panel data is powerful because it lets you control for unobserved entity-specific effects (fixed effects) that don't change over time, getting you closer to causal inference. It requires special models — pooled OLS, fixed effects, or random effects — to handle the correlation structure properly.</p>
      </div>
    ),
    prerequisites: ['cross-sectional-data', 'time-series-data'],
    chapterOrigin: 'ch1',
    category: 'foundations',
  },

  'generalized-linear-model': {
    id: 'generalized-linear-model',
    displayName: 'Generalized Linear Model (GLM)',
    shortDefinition: 'A flexible framework that extends linear regression to non-normal response variables through a link function.',
    content: (
      <div className="space-y-2">
        <p>A GLM has three components: (1) a random component specifying the distribution of Y (Normal, Binomial, Poisson, etc.), (2) a systematic component — the linear predictor <MathBlock tex="\eta = X\beta" />, and (3) a link function <MathBlock tex="g(\mu) = \eta" /> connecting the mean of Y to the linear predictor.</p>
        <p>OLS is a GLM with a Normal distribution and identity link. Logistic regression uses a Binomial distribution and logit link. Poisson regression uses a Poisson distribution and log link. All are estimated via maximum likelihood. Recognizing this unifying framework helps you choose the right model for your response variable type.</p>
      </div>
    ),
    prerequisites: ['regression', 'mle', 'link-function'],
    chapterOrigin: 'ch1',
    category: 'foundations',
  },

  'link-function': {
    id: 'link-function',
    displayName: 'Link Function',
    shortDefinition: 'A function that connects the mean of the response variable to the linear predictor in a GLM.',
    content: (
      <div className="space-y-2">
        <p>In a Generalized Linear Model, the link function transforms the expected value of the response so that the transformed mean is a linear function of the predictors: <MathBlock tex="g(E[Y]) = X\beta" />.</p>
        <p>Common link functions include: the <strong>identity</strong> link (for normal regression, no transformation), the <strong>logit</strong> link <MathBlock tex="g(\mu) = \ln(\mu / (1-\mu))" /> for binary outcomes, and the <strong>log</strong> link <MathBlock tex="g(\mu) = \ln(\mu)" /> for count data. The link function ensures that predicted values respect the natural constraints of the response (e.g., probabilities stay between 0 and 1).</p>
      </div>
    ),
    prerequisites: ['regression'],
    chapterOrigin: 'ch3',
    category: 'foundations',
  },

  'sigmoid-function': {
    id: 'sigmoid-function',
    displayName: 'Sigmoid Function',
    shortDefinition: 'An S-shaped function that maps any real number to the (0, 1) interval.',
    content: (
      <div className="space-y-2">
        <p>The sigmoid (logistic) function is defined as:</p>
        <MathBlock tex="\sigma(z) = \frac{1}{1 + e^{-z}}" display />
        <p>It maps any input from <MathBlock tex="(-\infty, +\infty)" /> to <MathBlock tex="(0, 1)" />, making it perfect for modeling probabilities. When <MathBlock tex="z = 0" />, the output is 0.5. As z grows large, the output approaches 1; as z grows very negative, it approaches 0. The sigmoid appears in logistic regression (as the inverse of the logit link) and as an activation function in neural networks.</p>
      </div>
    ),
    prerequisites: [],
    chapterOrigin: 'ch3',
    category: 'foundations',
  },

  'euclidean-distance': {
    id: 'euclidean-distance',
    displayName: 'Euclidean Distance',
    shortDefinition: 'The straight-line distance between two points in multidimensional space.',
    content: (
      <div className="space-y-2">
        <p>Euclidean distance is the most common distance metric, generalizing the Pythagorean theorem to any number of dimensions:</p>
        <MathBlock tex="d(\mathbf{x}, \mathbf{y}) = \sqrt{\sum_{i=1}^{p}(x_i - y_i)^2}" display />
        <p>It measures how "far apart" two data points are in feature space. Clustering algorithms like K-means and hierarchical clustering use it to decide which observations belong together. One important caveat: Euclidean distance is sensitive to scale, so you should standardize features before computing distances if they have different units.</p>
      </div>
    ),
    prerequisites: [],
    chapterOrigin: 'ch9',
    category: 'foundations',
  },

  'overfitting': {
    id: 'overfitting',
    displayName: 'Overfitting',
    shortDefinition: 'When a model captures noise in the training data rather than the underlying pattern, performing poorly on new data.',
    content: (
      <div className="space-y-2">
        <p>Overfitting occurs when a model is too complex relative to the amount of training data. It memorizes quirks and noise in the training set, achieving very high in-sample accuracy but failing to generalize to unseen data.</p>
        <p>Signs of overfitting include: very high training accuracy but low test accuracy, wildly large coefficient estimates, and models that change dramatically with small perturbations to the data. Remedies include regularization (L1/L2 penalties), cross-validation, reducing model complexity, and collecting more data.</p>
      </div>
    ),
    prerequisites: ['ols'],
    chapterOrigin: 'ch11',
    category: 'foundations',
  },

  // ── Linear Models ───────────────────────────────────────────

  'ols': {
    id: 'ols',
    displayName: 'Ordinary Least Squares (OLS)',
    shortDefinition: 'The most common method for estimating linear regression coefficients by minimizing the sum of squared residuals.',
    content: (
      <div className="space-y-2">
        <p>OLS finds the coefficient vector that minimizes the sum of squared differences between observed and predicted values:</p>
        <MathBlock tex="\hat{\beta} = \arg\min_\beta \sum_{i=1}^{n}(y_i - X_i\beta)^2 = (X'X)^{-1}X'y" display />
        <p>Under the Gauss-Markov assumptions (linearity, exogeneity, homoscedasticity, no perfect multicollinearity), OLS is the Best Linear Unbiased Estimator (BLUE) — it has the smallest variance among all linear unbiased estimators. OLS is the starting point for most regression analysis, but when its assumptions are violated (e.g., binary outcomes, count data), you need generalized models.</p>
      </div>
    ),
    prerequisites: ['regression'],
    chapterOrigin: 'ch2',
    category: 'linear',
  },

  'r-squared': {
    id: 'r-squared',
    displayName: 'R-Squared',
    shortDefinition: 'The proportion of variance in the dependent variable explained by the model.',
    content: (
      <div className="space-y-2">
        <MathBlock tex="R^2 = 1 - \frac{SS_{res}}{SS_{tot}} = 1 - \frac{\sum(y_i - \hat{y}_i)^2}{\sum(y_i - \bar{y})^2}" display />
        <p><MathBlock tex="R^2" /> ranges from 0 to 1. A value of 0.7 means the model explains 70% of the variation in Y. However, <MathBlock tex="R^2" /> always increases (or stays the same) when you add more variables, even useless ones — which is why adjusted <MathBlock tex="R^2" /> is preferred for model comparison.</p>
        <p>Important caveats: a high <MathBlock tex="R^2" /> does not imply causation, the model is correctly specified, or that predictions are accurate. A low <MathBlock tex="R^2" /> doesn't mean variables are unimportant — it just means there's a lot of unexplained variance.</p>
      </div>
    ),
    prerequisites: ['ols', 'residuals'],
    chapterOrigin: 'ch2',
    category: 'linear',
  },

  'adjusted-r-squared': {
    id: 'adjusted-r-squared',
    displayName: 'Adjusted R-Squared',
    shortDefinition: 'A modified R-squared that penalizes for the number of predictors, preventing artificial inflation.',
    content: (
      <div className="space-y-2">
        <MathBlock tex="\bar{R}^2 = 1 - \frac{(1 - R^2)(n - 1)}{n - k - 1}" display />
        <p>Unlike regular <MathBlock tex="R^2" />, the adjusted version penalizes for adding predictors that don't meaningfully improve fit. It can actually decrease if a new variable doesn't contribute enough explanatory power to offset the penalty for increased complexity.</p>
        <p>Use adjusted <MathBlock tex="R^2" /> (not raw <MathBlock tex="R^2" />) when comparing models with different numbers of predictors. Note that for non-linear models (logistic, Poisson), pseudo-<MathBlock tex="R^2" /> measures are used instead, which have different interpretations.</p>
      </div>
    ),
    prerequisites: ['r-squared'],
    chapterOrigin: 'ch2',
    category: 'linear',
  },

  'residuals': {
    id: 'residuals',
    displayName: 'Residuals',
    shortDefinition: 'The differences between observed and predicted values — the "leftover" unexplained variation.',
    content: (
      <div className="space-y-2">
        <MathBlock tex="e_i = y_i - \hat{y}_i" display />
        <p>Residuals are your diagnostic tool for checking model assumptions. Plot them against fitted values, predictors, and time to check for patterns. If assumptions hold, residuals should look like random noise — no trends, no funneling, no clusters.</p>
        <p>Common residual patterns and what they reveal: a funnel shape indicates heteroscedasticity, a curve suggests non-linearity (missing squared term), and clusters suggest omitted categorical variables. Standardized and studentized residuals help identify outliers.</p>
      </div>
    ),
    prerequisites: ['ols'],
    chapterOrigin: 'ch2',
    category: 'linear',
  },

  'heteroscedasticity': {
    id: 'heteroscedasticity',
    displayName: 'Heteroscedasticity',
    shortDefinition: 'When the variance of residuals is not constant across observations, violating a key OLS assumption.',
    content: (
      <div className="space-y-2">
        <p>OLS assumes homoscedasticity: <MathBlock tex="\text{Var}(\epsilon_i) = \sigma^2" /> for all i. Heteroscedasticity means the error variance changes with X — for example, spending variability increasing with income.</p>
        <p>Heteroscedasticity doesn't bias OLS coefficients, but it makes standard errors incorrect, leading to unreliable hypothesis tests. Detect it with the Breusch-Pagan or White test. Remedies include: robust (Huber-White) standard errors, weighted least squares, or log-transforming the dependent variable.</p>
      </div>
    ),
    prerequisites: ['residuals', 'ols'],
    chapterOrigin: 'ch2',
    category: 'linear',
  },

  'multicollinearity': {
    id: 'multicollinearity',
    displayName: 'Multicollinearity',
    shortDefinition: 'When two or more predictors are highly correlated, making it hard to isolate their individual effects.',
    content: (
      <div className="space-y-2">
        <p>Multicollinearity occurs when independent variables are strongly linearly related. Perfect multicollinearity (one variable is an exact linear combination of others) makes OLS impossible — <MathBlock tex="(X'X)" /> becomes singular. Near-perfect multicollinearity inflates standard errors, making coefficients unstable and hypothesis tests unreliable.</p>
        <p>Detect it using the Variance Inflation Factor (VIF). A VIF above 5-10 is concerning. Remedies: drop one of the correlated variables, combine them (e.g., create an index), use ridge regression, or collect more data. Note: multicollinearity doesn't affect predictions — only the interpretation of individual coefficients.</p>
      </div>
    ),
    prerequisites: ['ols'],
    chapterOrigin: 'ch2',
    category: 'linear',
  },

  'vif': {
    id: 'vif',
    displayName: 'Variance Inflation Factor (VIF)',
    shortDefinition: 'A measure of how much the variance of a coefficient is inflated due to multicollinearity.',
    content: (
      <div className="space-y-2">
        <p>For each predictor <MathBlock tex="X_j" />, regress it on all other predictors and compute:</p>
        <MathBlock tex="VIF_j = \frac{1}{1 - R_j^2}" display />
        <p>where <MathBlock tex="R_j^2" /> is the R-squared from that auxiliary regression. A VIF of 1 means no multicollinearity. A VIF of 5 means the variance of that coefficient is 5 times larger than it would be without multicollinearity. Common thresholds: VIF &gt; 5 warrants investigation; VIF &gt; 10 indicates serious problems.</p>
      </div>
    ),
    prerequisites: ['multicollinearity', 'r-squared'],
    chapterOrigin: 'ch2',
    category: 'linear',
  },

  'aic-bic': {
    id: 'aic-bic',
    displayName: 'AIC / BIC',
    shortDefinition: 'Information criteria for model selection that balance goodness of fit against model complexity.',
    content: (
      <div className="space-y-2">
        <MathBlock tex="AIC = -2\ln(\hat{L}) + 2k" display />
        <MathBlock tex="BIC = -2\ln(\hat{L}) + k\ln(n)" display />
        <p>Both measure model quality where lower is better. The first term rewards fit (higher likelihood), the second penalizes complexity (more parameters k). BIC penalizes complexity more heavily than AIC, especially for large samples, so it tends to select simpler models.</p>
        <p>Use AIC/BIC to compare non-nested models estimated on the same data. They're especially useful when you can't use an F-test (e.g., comparing a logistic regression with different variable sets). Neither tells you if the model is "good" in absolute terms — only which is better among candidates.</p>
      </div>
    ),
    prerequisites: ['mle'],
    chapterOrigin: 'ch2',
    category: 'linear',
  },

  'f-test': {
    id: 'f-test',
    displayName: 'F-Test',
    shortDefinition: 'A hypothesis test that checks whether a group of coefficients are jointly zero — i.e., whether the predictors matter.',
    content: (
      <div className="space-y-2">
        <MathBlock tex="F = \frac{(SS_{res,\text{restricted}} - SS_{res,\text{full}}) / q}{SS_{res,\text{full}} / (n - k - 1)}" display />
        <p>The overall F-test checks whether any of your predictors help explain Y (null: all slopes are zero). A partial F-test checks whether a subset of variables is jointly significant. The F-statistic follows an F-distribution under the null hypothesis.</p>
        <p>A significant overall F-test means at least one predictor matters, but it doesn't tell you which one. Individual t-tests on each coefficient can be misleading when there is multicollinearity — the F-test avoids this by testing them jointly.</p>
      </div>
    ),
    prerequisites: ['ols', 'r-squared'],
    chapterOrigin: 'ch2',
    category: 'linear',
  },

  'gauss-markov': {
    id: 'gauss-markov',
    displayName: 'Gauss-Markov Theorem',
    shortDefinition: 'Under classical assumptions, OLS is the best (minimum variance) linear unbiased estimator.',
    content: (
      <div className="space-y-2">
        <p>The Gauss-Markov theorem states that if the following hold — (1) linearity in parameters, (2) random sampling, (3) no perfect multicollinearity, (4) zero conditional mean of errors, and (5) homoscedasticity — then OLS is BLUE: the Best Linear Unbiased Estimator.</p>
        <p>"Best" means smallest variance among all linear unbiased estimators. If assumption (5) fails (heteroscedasticity), OLS is still unbiased but no longer efficient — you should use robust standard errors or WLS. If assumption (4) fails (endogeneity), OLS is biased, and you need instrumental variables or other approaches.</p>
      </div>
    ),
    prerequisites: ['ols', 'heteroscedasticity'],
    chapterOrigin: 'ch2',
    category: 'linear',
  },

  'dummy-variable': {
    id: 'dummy-variable',
    displayName: 'Dummy Variable',
    shortDefinition: 'A binary (0/1) variable used to include categorical information in a regression model.',
    content: (
      <div className="space-y-2">
        <p>Dummy variables encode categorical features as numbers. If a variable has K categories, you create K−1 dummies (the omitted category becomes the reference group). The coefficient on a dummy represents the average difference in Y between that category and the reference, holding other variables constant.</p>
        <p>For example, with regions (North, South, West), you create dummies for South and West. The intercept represents North, and the South coefficient shows how much higher (or lower) Y is in the South compared to the North. Including all K dummies causes perfect multicollinearity (the &quot;dummy variable trap&quot;).</p>
      </div>
    ),
    prerequisites: ['ols'],
    chapterOrigin: 'ch2',
    category: 'linear',
  },

  // ── Estimation ──────────────────────────────────────────────

  'mle': {
    id: 'mle',
    displayName: 'Maximum Likelihood Estimation (MLE)',
    shortDefinition: 'An estimation method that finds parameter values maximizing the probability of observing the data.',
    content: (
      <div className="space-y-2">
        <p>MLE finds the parameters <MathBlock tex="\theta" /> that maximize the likelihood function — the probability of the observed data given the model:</p>
        <MathBlock tex="\hat{\theta}_{MLE} = \arg\max_\theta \prod_{i=1}^{n} f(y_i | X_i, \theta)" display />
        <p>In practice we maximize the log-likelihood (since products become sums): <MathBlock tex="\ell(\theta) = \sum_{i=1}^n \ln f(y_i | X_i, \theta)" />. MLE is the workhorse estimator for logistic regression, Poisson regression, Tobit, survival models, and most other non-OLS models. It's consistent (converges to the truth) and asymptotically efficient (achieves the lowest possible variance for large samples).</p>
      </div>
    ),
    prerequisites: [],
    chapterOrigin: 'ch3',
    category: 'estimation',
  },

  'marginal-effects': {
    id: 'marginal-effects',
    displayName: 'Marginal Effects',
    shortDefinition: 'The change in the predicted outcome for a one-unit change in a predictor, evaluated at specific values.',
    content: (
      <div className="space-y-2">
        <p>In non-linear models (logit, probit, Tobit, Poisson), coefficients don't directly tell you the effect on Y. The marginal effect translates the coefficient into a meaningful quantity — the actual change in the outcome for a one-unit change in X:</p>
        <MathBlock tex="\frac{\partial E[Y|X]}{\partial X_j}" display />
        <p>There are two common versions: marginal effects at the mean (MEM), evaluated at the average values of all X's, and average marginal effects (AME), which compute the marginal effect for each observation and then average. AME is generally preferred because it doesn't assume the "average person" exists.</p>
      </div>
    ),
    prerequisites: ['mle'],
    chapterOrigin: 'ch4',
    category: 'estimation',
  },

  'hausman-test': {
    id: 'hausman-test',
    displayName: 'Hausman Test',
    shortDefinition: 'A specification test comparing a consistent estimator to an efficient estimator to detect endogeneity or model misspecification.',
    content: (
      <div className="space-y-2">
        <p>The Hausman test compares two estimators: one that is consistent under both the null and alternative hypotheses (e.g., IV or fixed effects), and one that is efficient under the null but inconsistent under the alternative (e.g., OLS or random effects).</p>
        <MathBlock tex="H = (\hat{\beta}_{consistent} - \hat{\beta}_{efficient})'[\text{Var}(\hat{\beta}_{consistent}) - \text{Var}(\hat{\beta}_{efficient})]^{-1}(\hat{\beta}_{consistent} - \hat{\beta}_{efficient})" display />
        <p>If the test is significant, the estimates differ systematically, suggesting the efficient estimator is misspecified — for example, endogeneity is present (use IV) or entity effects are correlated with X (use fixed effects). It's used in IV/endogeneity testing (Chapter 8) and in the IIA test for discrete choice models (Chapter 7).</p>
      </div>
    ),
    prerequisites: ['ols', 'mle'],
    chapterOrigin: 'ch7',
    category: 'estimation',
  },

  'consistency': {
    id: 'consistency',
    displayName: 'Consistency',
    shortDefinition: 'A property where an estimator converges to the true parameter value as sample size grows to infinity.',
    content: (
      <div className="space-y-2">
        <p>An estimator <MathBlock tex="\hat{\theta}_n" /> is consistent if it converges in probability to the true value <MathBlock tex="\theta" /> as <MathBlock tex="n \to \infty" />:</p>
        <MathBlock tex="\hat{\theta}_n \xrightarrow{p} \theta" display />
        <p>OLS is consistent when its assumptions hold (especially exogeneity). But under endogeneity, OLS is inconsistent — no matter how much data you collect, the estimate converges to the wrong value. This is why instrumental variables matter: 2SLS is consistent even under endogeneity, though it may have larger variance in finite samples.</p>
      </div>
    ),
    prerequisites: ['ols'],
    chapterOrigin: 'ch8',
    category: 'estimation',
  },

  // ── Binary Response ─────────────────────────────────────────

  'logistic-regression': {
    id: 'logistic-regression',
    displayName: 'Logistic Regression',
    shortDefinition: 'A regression model for binary outcomes that uses the logit link to keep predicted probabilities in [0, 1].',
    content: (
      <div className="space-y-2">
        <p>Logistic regression models the probability that a binary outcome equals 1:</p>
        <MathBlock tex="P(Y=1|X) = \frac{1}{1 + e^{-X\beta}} = \frac{e^{X\beta}}{1 + e^{X\beta}}" display />
        <p>Equivalently, the log-odds (logit) is a linear function of X: <MathBlock tex="\ln\frac{p}{1-p} = X\beta" />. Coefficients represent the change in log-odds for a one-unit increase in X. Exponentiating a coefficient gives the odds ratio. Estimated via MLE, not OLS. Model evaluation uses the confusion matrix, ROC curve, and AUC rather than R-squared.</p>
      </div>
    ),
    prerequisites: ['mle', 'sigmoid-function', 'link-function'],
    chapterOrigin: 'ch3',
    category: 'binary',
  },

  'probit-model': {
    id: 'probit-model',
    displayName: 'Probit Model',
    shortDefinition: 'A binary response model using the standard normal CDF as the link function instead of the logistic function.',
    content: (
      <div className="space-y-2">
        <p>The probit model is an alternative to logistic regression for binary outcomes:</p>
        <MathBlock tex="P(Y=1|X) = \Phi(X\beta)" display />
        <p>where <MathBlock tex="\Phi" /> is the standard normal CDF. It arises naturally from a latent variable interpretation: if an unobserved continuous variable <MathBlock tex="Y^*=X\beta+\epsilon" /> exceeds a threshold, the observed Y = 1, and if <MathBlock tex="\epsilon \sim N(0,1)" />, you get the probit model.</p>
        <p>In practice, logit and probit give very similar results. Logit is more popular because of the odds ratio interpretation. Probit is preferred in some economics contexts due to its latent variable foundation.</p>
      </div>
    ),
    prerequisites: ['mle', 'link-function'],
    chapterOrigin: 'ch3',
    category: 'binary',
  },

  'odds-ratio': {
    id: 'odds-ratio',
    displayName: 'Odds Ratio',
    shortDefinition: 'The factor by which the odds of the outcome change for a one-unit increase in a predictor.',
    content: (
      <div className="space-y-2">
        <p>In logistic regression, the odds ratio for predictor <MathBlock tex="X_j" /> is <MathBlock tex="e^{\beta_j}" />. If <MathBlock tex="\beta_j = 0.5" />, the odds ratio is <MathBlock tex="e^{0.5} \approx 1.65" />, meaning each unit increase in <MathBlock tex="X_j" /> multiplies the odds of Y=1 by 1.65 (a 65% increase in odds).</p>
        <p>Key interpretation: an OR of 1 means no effect, OR &gt; 1 means higher odds, OR &lt; 1 means lower odds. Don't confuse odds with probability — odds of 3:1 correspond to a probability of 0.75. The odds ratio is popular because it has a symmetric, multiplicative interpretation that doesn't depend on the baseline probability.</p>
      </div>
    ),
    prerequisites: ['logistic-regression', 'log-odds'],
    chapterOrigin: 'ch3',
    category: 'binary',
  },

  'log-odds': {
    id: 'log-odds',
    displayName: 'Log-Odds (Logit)',
    shortDefinition: 'The natural logarithm of the odds, forming the linear predictor in logistic regression.',
    content: (
      <div className="space-y-2">
        <p>The log-odds, or logit, transforms a probability into an unbounded continuous scale:</p>
        <MathBlock tex="\text{logit}(p) = \ln\frac{p}{1-p}" display />
        <p>When p = 0.5, logit = 0. When p approaches 1, logit goes to +∞; when p approaches 0, logit goes to −∞. In logistic regression, the logit is modeled as a linear function of X, which is why logistic regression is also called the logit model. This transformation makes linear modeling possible for probability outcomes.</p>
      </div>
    ),
    prerequisites: ['odds-ratio'],
    chapterOrigin: 'ch3',
    category: 'binary',
  },

  'confusion-matrix': {
    id: 'confusion-matrix',
    displayName: 'Confusion Matrix',
    shortDefinition: 'A table showing true positives, false positives, true negatives, and false negatives for a classifier.',
    content: (
      <div className="space-y-2">
        <p>For a binary classifier at a given threshold, the confusion matrix shows four counts: True Positives (correctly predicted 1), False Positives (predicted 1 but actually 0, "Type I error"), False Negatives (predicted 0 but actually 1, "Type II error"), and True Negatives (correctly predicted 0).</p>
        <p>From these you compute: <strong>Accuracy</strong> = (TP+TN)/(TP+FP+FN+TN), <strong>Precision</strong> = TP/(TP+FP) ("of those I called positive, how many were?"), <strong>Recall/Sensitivity</strong> = TP/(TP+FN) ("of all actual positives, how many did I find?"), and <strong>F1</strong> = harmonic mean of precision and recall. The right metric depends on the business cost of false positives vs. false negatives.</p>
      </div>
    ),
    prerequisites: ['logistic-regression'],
    chapterOrigin: 'ch3',
    category: 'binary',
  },

  'roc-curve': {
    id: 'roc-curve',
    displayName: 'ROC Curve',
    shortDefinition: 'A plot of the true positive rate vs. false positive rate across all classification thresholds.',
    content: (
      <div className="space-y-2">
        <p>The Receiver Operating Characteristic (ROC) curve evaluates a binary classifier across all possible thresholds. The x-axis is the false positive rate (1 − specificity), and the y-axis is the true positive rate (sensitivity). Each point on the curve represents a different classification threshold.</p>
        <p>A diagonal line (from origin to top-right) represents random guessing. The further the ROC curve bows toward the upper-left, the better the model discriminates. The ROC curve is threshold-independent, making it a fair summary of the model's discriminative ability regardless of how you set the decision boundary.</p>
      </div>
    ),
    prerequisites: ['confusion-matrix'],
    chapterOrigin: 'ch3',
    category: 'binary',
  },

  'auc': {
    id: 'auc',
    displayName: 'AUC (Area Under the ROC Curve)',
    shortDefinition: 'A single number summarizing classifier performance — the probability that a random positive is ranked higher than a random negative.',
    content: (
      <div className="space-y-2">
        <p>AUC ranges from 0 to 1. An AUC of 0.5 means the model is no better than random guessing; 1.0 means perfect discrimination. In practical terms, AUC = 0.8 means that if you randomly pick one positive and one negative observation, the model gives the positive a higher predicted probability 80% of the time.</p>
        <p>Rough guidelines: 0.5-0.6 = poor, 0.6-0.7 = fair, 0.7-0.8 = good, 0.8-0.9 = excellent, 0.9+ = outstanding. AUC is useful for comparing models but doesn't tell you about calibration (whether predicted probabilities match actual frequencies). AUC can be misleading with highly imbalanced classes.</p>
      </div>
    ),
    prerequisites: ['roc-curve'],
    chapterOrigin: 'ch3',
    category: 'binary',
  },

  // ── Censored Data ───────────────────────────────────────────

  'censoring': {
    id: 'censoring',
    displayName: 'Censoring',
    shortDefinition: 'When the true value of an observation is only partially known — bounded but not precisely observed.',
    content: (
      <div className="space-y-2">
        <p>Censoring occurs when the actual value of a variable is not fully observed, but you know it falls beyond a certain boundary. <strong>Right censoring:</strong> you know the value is at least X (e.g., a customer is still alive/active at the end of the study). <strong>Left censoring:</strong> the value is at most X (e.g., a chemical concentration is below the detection limit). <strong>Interval censoring:</strong> the value falls within a known range.</p>
        <p>Censoring differs from truncation: with censoring, you observe that the unit exists (you just don't know the exact value); with truncation, you never observe the unit at all. Ignoring censoring and using OLS biases estimates — specialized models like Tobit (for censored outcomes) or Cox (for censored durations) are needed.</p>
      </div>
    ),
    prerequisites: [],
    chapterOrigin: 'ch4',
    category: 'censored',
  },

  'truncation': {
    id: 'truncation',
    displayName: 'Truncation',
    shortDefinition: 'When observations outside a certain range are entirely excluded from the sample.',
    content: (
      <div className="space-y-2">
        <p>Truncation means observations with values beyond a threshold are completely absent from the data — you don't even know they exist. For example, if you only study employed individuals to model wages, the unemployed (wage = 0 or unobserved) are truncated out entirely.</p>
        <p>This is more severe than censoring. With censoring, you at least know the observation exists; with truncation, missing observations reduce your sample in a non-random way, biasing results toward the observable range. Truncated regression models (like the truncated normal) are needed to correct for this selection.</p>
      </div>
    ),
    prerequisites: ['censoring'],
    chapterOrigin: 'ch4',
    category: 'censored',
  },

  'tobit-model': {
    id: 'tobit-model',
    displayName: 'Tobit Model',
    shortDefinition: 'A regression model for censored dependent variables, combining a probability of censoring with a continuous outcome.',
    content: (
      <div className="space-y-2">
        <p>The Tobit model handles situations where the dependent variable is censored at a boundary (typically zero). It assumes a latent (unobserved) variable <MathBlock tex="y^*" /> that can take any value:</p>
        <MathBlock tex="y_i^* = X_i\beta + \epsilon_i, \quad y_i = \max(0, y_i^*)" display />
        <p>The likelihood has two parts: for uncensored observations, the normal density; for censored observations (at zero), the probability that <MathBlock tex="y^* \le 0" />. Tobit coefficients don't have the same interpretation as OLS — you need to compute marginal effects, which account for both the probability of being uncensored and the conditional mean given uncensoring.</p>
      </div>
    ),
    prerequisites: ['mle', 'censoring', 'latent-variable'],
    chapterOrigin: 'ch4',
    category: 'censored',
  },

  'latent-variable': {
    id: 'latent-variable',
    displayName: 'Latent Variable',
    shortDefinition: 'An unobserved variable that drives the observed outcome through a threshold or transformation mechanism.',
    content: (
      <div className="space-y-2">
        <p>A latent variable is a theoretical quantity that you cannot directly measure but that determines what you do observe. In the probit model, the latent variable <MathBlock tex="y^* = X\beta + \epsilon" /> represents an underlying propensity; the binary outcome Y equals 1 when <MathBlock tex="y^*" /> crosses a threshold.</p>
        <p>In the Tobit model, the latent variable is an uncensored version of the outcome. In factor analysis and structural equation modeling, latent variables represent unobserved constructs like "intelligence" or "customer satisfaction." The concept is foundational across many areas of statistics and econometrics.</p>
      </div>
    ),
    prerequisites: [],
    chapterOrigin: 'ch4',
    category: 'censored',
  },

  'selection-bias': {
    id: 'selection-bias',
    displayName: 'Selection Bias',
    shortDefinition: 'Systematic error from analyzing a non-representative sample due to how observations enter the dataset.',
    content: (
      <div className="space-y-2">
        <p>Selection bias occurs when the mechanism that determines whether an observation appears in your data is correlated with the outcome you're studying. For example, studying the returns to education using only employed individuals ignores that education also affects the probability of being employed.</p>
        <p>If you run OLS on a selected sample, the estimates are biased and inconsistent. Corrections include the Heckman selection model (two-step procedure), Tobit models for censored data, and careful study design that avoids conditioning on post-treatment variables.</p>
      </div>
    ),
    prerequisites: ['ols'],
    chapterOrigin: 'ch4',
    category: 'censored',
  },

  // ── Count Data ──────────────────────────────────────────────

  'poisson-distribution': {
    id: 'poisson-distribution',
    displayName: 'Poisson Distribution',
    shortDefinition: 'A discrete probability distribution for the number of events in a fixed interval, where events occur independently at a constant rate.',
    content: (
      <div className="space-y-2">
        <MathBlock tex="P(Y = k) = \frac{e^{-\lambda}\lambda^k}{k!}, \quad k = 0, 1, 2, \ldots" display />
        <p>The Poisson distribution is parameterized by <MathBlock tex="\lambda" /> (lambda), which is both the mean and the variance. This mean = variance property (equidispersion) is the key restriction that is often violated in real data. The distribution is appropriate for rare events: customer complaints per day, accidents per month, defects per unit.</p>
      </div>
    ),
    prerequisites: [],
    chapterOrigin: 'ch5',
    category: 'count',
  },

  'poisson-regression': {
    id: 'poisson-regression',
    displayName: 'Poisson Regression',
    shortDefinition: 'A GLM for count data that uses the log link and assumes the response follows a Poisson distribution.',
    content: (
      <div className="space-y-2">
        <p>Poisson regression models count outcomes as:</p>
        <MathBlock tex="\ln(\lambda_i) = X_i\beta \quad \Rightarrow \quad \lambda_i = e^{X_i\beta}" display />
        <p>Coefficients are interpreted multiplicatively: <MathBlock tex="e^{\beta_j}" /> is the incidence rate ratio — the factor by which the expected count changes for a one-unit increase in <MathBlock tex="X_j" />. Estimated via MLE. The key assumption is equidispersion (mean = variance). If variance exceeds the mean (overdispersion), standard errors are too small, leading to overconfident inference.</p>
      </div>
    ),
    prerequisites: ['poisson-distribution', 'mle', 'link-function'],
    chapterOrigin: 'ch5',
    category: 'count',
  },

  'overdispersion': {
    id: 'overdispersion',
    displayName: 'Overdispersion',
    shortDefinition: 'When the observed variance in count data exceeds the mean, violating the Poisson assumption.',
    content: (
      <div className="space-y-2">
        <p>The Poisson distribution constrains <MathBlock tex="\text{Var}(Y) = E(Y)" />. In real data, you often see <MathBlock tex="\text{Var}(Y) > E(Y)" />, called overdispersion. Common causes: unobserved heterogeneity (subgroups with different rates), excess zeros, or correlation between events.</p>
        <p>Overdispersion doesn't bias the Poisson regression coefficients, but standard errors are too small, inflating t-statistics and making you think effects are significant when they're not. Detect it by comparing the residual deviance to degrees of freedom (ratio ≫ 1 suggests overdispersion). Remedies: negative binomial model, quasi-Poisson (which adjusts standard errors), or zero-inflated models.</p>
      </div>
    ),
    prerequisites: ['poisson-regression'],
    chapterOrigin: 'ch5',
    category: 'count',
  },

  'negative-binomial': {
    id: 'negative-binomial',
    displayName: 'Negative Binomial Model',
    shortDefinition: 'A count regression model that adds a dispersion parameter to handle overdispersion the Poisson cannot.',
    content: (
      <div className="space-y-2">
        <p>The negative binomial model generalizes Poisson regression by allowing <MathBlock tex="\text{Var}(Y) = \mu + \alpha\mu^2" />, where <MathBlock tex="\alpha" /> is the dispersion parameter. When <MathBlock tex="\alpha = 0" />, it reduces to Poisson. Larger <MathBlock tex="\alpha" /> means more overdispersion.</p>
        <p>Interpretation of coefficients is the same as Poisson regression — exponentiated coefficients are incidence rate ratios. Use a likelihood ratio test comparing the negative binomial to the Poisson to check whether the extra parameter is needed. The negative binomial is the go-to remedy for overdispersed count data.</p>
      </div>
    ),
    prerequisites: ['overdispersion', 'poisson-regression'],
    chapterOrigin: 'ch5',
    category: 'count',
  },

  'zero-inflated-model': {
    id: 'zero-inflated-model',
    displayName: 'Zero-Inflated Model',
    shortDefinition: 'A two-part model for count data with more zeros than a standard count distribution can explain.',
    content: (
      <div className="space-y-2">
        <p>Zero-inflated models assume the data comes from two processes: (1) a binary process that produces "structural" zeros (observations that could never have a positive count), and (2) a count process (Poisson or NB) that produces both zeros and positive counts.</p>
        <p>Example: customer insurance claims. Some customers will never file a claim (structural zeros from the logit part). Others might file zero, one, or more claims (count zeros and positives from the Poisson/NB part). The ZIP (Zero-Inflated Poisson) and ZINB (Zero-Inflated Negative Binomial) are the two variants. Use the Vuong test to determine whether zero inflation is needed.</p>
      </div>
    ),
    prerequisites: ['poisson-regression', 'logistic-regression'],
    chapterOrigin: 'ch5',
    category: 'count',
  },

  'incidence-rate-ratio': {
    id: 'incidence-rate-ratio',
    displayName: 'Incidence Rate Ratio (IRR)',
    shortDefinition: 'The exponentiated Poisson regression coefficient, representing the multiplicative change in the expected count.',
    content: (
      <div className="space-y-2">
        <p>In Poisson and negative binomial regression, <MathBlock tex="IRR = e^{\beta_j}" />. An IRR of 1.3 means a one-unit increase in <MathBlock tex="X_j" /> is associated with a 30% increase in the expected count. An IRR of 0.8 means a 20% decrease.</p>
        <p>IRRs are the count-data analog of odds ratios in logistic regression. They provide a more intuitive interpretation than raw log-scale coefficients. Confidence intervals for IRRs are obtained by exponentiating the confidence interval for <MathBlock tex="\beta" />.</p>
      </div>
    ),
    prerequisites: ['poisson-regression'],
    chapterOrigin: 'ch5',
    category: 'count',
  },

  'deviance': {
    id: 'deviance',
    displayName: 'Deviance',
    shortDefinition: 'A goodness-of-fit measure comparing the fitted model to a saturated model, analogous to the sum of squares in OLS.',
    content: (
      <div className="space-y-2">
        <MathBlock tex="D = 2[\ell(\text{saturated}) - \ell(\text{fitted})]" display />
        <p>The saturated model has one parameter per observation (perfect fit). Deviance measures how far your model is from this perfect fit. Lower deviance = better fit. Residual deviance divided by degrees of freedom should be approximately 1 for a well-fitting Poisson model — a ratio much greater than 1 suggests overdispersion.</p>
      </div>
    ),
    prerequisites: ['mle'],
    chapterOrigin: 'ch5',
    category: 'count',
  },

  'dispersion-parameter': {
    id: 'dispersion-parameter',
    displayName: 'Dispersion Parameter',
    shortDefinition: 'A parameter controlling the variance-to-mean ratio in count models, distinguishing Poisson from negative binomial.',
    content: (
      <div className="space-y-2">
        <p>In the negative binomial model, the dispersion parameter <MathBlock tex="\alpha" /> (sometimes called <MathBlock tex="\theta" />) governs how much variance exceeds the mean: <MathBlock tex="\text{Var}(Y) = \mu + \alpha\mu^2" />.</p>
        <p>When <MathBlock tex="\alpha \to 0" />, the model collapses to Poisson. Larger <MathBlock tex="\alpha" /> means more overdispersion. You can test <MathBlock tex="H_0: \alpha = 0" /> using a likelihood ratio test. In quasi-Poisson models, the dispersion parameter is estimated as the Pearson chi-squared statistic divided by degrees of freedom and is used solely to inflate standard errors.</p>
      </div>
    ),
    prerequisites: ['overdispersion'],
    chapterOrigin: 'ch5',
    category: 'count',
  },

  'exposure-offset': {
    id: 'exposure-offset',
    displayName: 'Exposure / Offset',
    shortDefinition: 'An adjustment in Poisson regression for varying observation periods or population sizes.',
    content: (
      <div className="space-y-2">
        <p>If observations have different "exposure" (time periods, population sizes, areas), raw counts aren't comparable. The offset converts counts to rates. In Poisson regression:</p>
        <MathBlock tex="\ln(\lambda_i) = X_i\beta + \ln(t_i)" display />
        <p>The <MathBlock tex="\ln(t_i)" /> term is the offset — it enters the model with a fixed coefficient of 1. This is equivalent to modeling the rate <MathBlock tex="\lambda_i / t_i" /> rather than the count. For example, comparing accident counts across cities of different sizes requires an offset for population.</p>
      </div>
    ),
    prerequisites: ['poisson-regression'],
    chapterOrigin: 'ch5',
    category: 'count',
  },

  // ── Survival Analysis ───────────────────────────────────────

  'survival-function': {
    id: 'survival-function',
    displayName: 'Survival Function',
    shortDefinition: 'The probability that an event has not yet occurred by time t.',
    content: (
      <div className="space-y-2">
        <MathBlock tex="S(t) = P(T > t) = 1 - F(t)" display />
        <p>The survival function starts at <MathBlock tex="S(0) = 1" /> (everyone is "alive" at the start) and decreases toward 0. It encodes the full timing distribution of an event. The median survival time is the t where <MathBlock tex="S(t) = 0.5" />.</p>
        <p>In business, the "event" might be churn, equipment failure, or first purchase. The survival function accounts for censoring — observations where the event hasn't happened yet by the end of the study.</p>
      </div>
    ),
    prerequisites: [],
    chapterOrigin: 'ch6',
    category: 'survival',
  },

  'hazard-function': {
    id: 'hazard-function',
    displayName: 'Hazard Function',
    shortDefinition: 'The instantaneous rate of the event occurring at time t, given survival up to that point.',
    content: (
      <div className="space-y-2">
        <MathBlock tex="h(t) = \lim_{\Delta t \to 0}\frac{P(t \le T < t + \Delta t \mid T \ge t)}{\Delta t} = -\frac{d}{dt}\ln S(t)" display />
        <p>The hazard is not a probability — it's a rate that can exceed 1. A constant hazard means the risk doesn't change over time (memoryless, like the exponential distribution). An increasing hazard means risk grows with time (aging). A decreasing hazard means risk falls (infant mortality in engineering).</p>
        <p>The hazard function and survival function are mathematically equivalent: knowing one determines the other via <MathBlock tex="S(t) = \exp\left(-\int_0^t h(u)\,du\right)" />.</p>
      </div>
    ),
    prerequisites: ['survival-function'],
    chapterOrigin: 'ch6',
    category: 'survival',
  },

  'kaplan-meier': {
    id: 'kaplan-meier',
    displayName: 'Kaplan-Meier Estimator',
    shortDefinition: 'A non-parametric estimator of the survival function that handles censored observations.',
    content: (
      <div className="space-y-2">
        <MathBlock tex="\hat{S}(t) = \prod_{t_j \le t}\left(1 - \frac{d_j}{n_j}\right)" display />
        <p>At each event time <MathBlock tex="t_j" />, <MathBlock tex="d_j" /> is the number of events and <MathBlock tex="n_j" /> is the number at risk (still alive and uncensored). The product of these survival probabilities gives the step-function estimate of S(t). Censored observations reduce the risk set at the censoring time without contributing an event.</p>
        <p>The KM estimator is model-free — it makes no assumptions about the shape of the hazard. It's the first tool for visualizing survival data, always plotted before fitting parametric or semi-parametric models.</p>
      </div>
    ),
    prerequisites: ['survival-function', 'censoring'],
    chapterOrigin: 'ch6',
    category: 'survival',
  },

  'cox-model': {
    id: 'cox-model',
    displayName: 'Cox Proportional Hazards Model',
    shortDefinition: 'A semi-parametric survival model that estimates the effect of covariates on the hazard without specifying the baseline hazard shape.',
    content: (
      <div className="space-y-2">
        <MathBlock tex="h(t|X) = h_0(t) \cdot \exp(X\beta)" display />
        <p>The baseline hazard <MathBlock tex="h_0(t)" /> is left unspecified (semi-parametric), while the covariates shift the hazard multiplicatively. The model is estimated via partial likelihood, which cleverly eliminates <MathBlock tex="h_0(t)" />.</p>
        <p>Coefficients are interpreted as log-hazard ratios. <MathBlock tex="e^{\beta_j}" /> is the hazard ratio: a value of 1.5 means that group has a 50% higher instantaneous risk of the event compared to the reference. The key assumption is proportional hazards — the hazard ratio is constant over time. Check this with Schoenfeld residuals or log-log plots.</p>
      </div>
    ),
    prerequisites: ['hazard-function', 'mle'],
    chapterOrigin: 'ch6',
    category: 'survival',
  },

  'hazard-ratio': {
    id: 'hazard-ratio',
    displayName: 'Hazard Ratio',
    shortDefinition: 'The ratio of hazard rates between two groups — the survival-analysis analog of the odds ratio.',
    content: (
      <div className="space-y-2">
        <MathBlock tex="HR = \frac{h(t|X_1)}{h(t|X_0)} = e^{\beta}" display />
        <p>A hazard ratio of 2 means the treatment group has twice the instantaneous risk of the event at any time. HR = 1 means no difference; HR &lt; 1 means the group has lower risk (protective effect). Unlike odds ratios, the hazard ratio has a time-to-event interpretation — it describes how quickly events happen, not just whether they happen.</p>
      </div>
    ),
    prerequisites: ['cox-model'],
    chapterOrigin: 'ch6',
    category: 'survival',
  },

  'proportional-hazards': {
    id: 'proportional-hazards',
    displayName: 'Proportional Hazards Assumption',
    shortDefinition: 'The assumption that the ratio of hazards between groups is constant over time.',
    content: (
      <div className="space-y-2">
        <p>The Cox model assumes that if treatment doubles the hazard at time 1, it also doubles it at time 10, 100, etc. Mathematically: <MathBlock tex="h(t|X_1) / h(t|X_0)" /> doesn't depend on t.</p>
        <p>Violations occur when effects wear off (a drug's benefit diminishes), accelerate, or reverse over time. Test with Schoenfeld residuals (plot against time — a trend indicates violation) or the global goodness-of-fit test. If violated, consider stratified Cox models, time-varying coefficients, or parametric alternatives.</p>
      </div>
    ),
    prerequisites: ['cox-model'],
    chapterOrigin: 'ch6',
    category: 'survival',
  },

  'log-rank-test': {
    id: 'log-rank-test',
    displayName: 'Log-Rank Test',
    shortDefinition: 'A non-parametric test comparing survival distributions between two or more groups.',
    content: (
      <div className="space-y-2">
        <p>The log-rank test is the survival-analysis equivalent of a chi-squared test. It compares the observed number of events in each group to the expected number under the null hypothesis that the survival curves are identical.</p>
        <p>It's most powerful when the hazards are truly proportional (constant ratio over time). If one group's hazard is initially higher but later lower, the test may fail to detect the difference because effects cancel out. In such cases, the Wilcoxon (Breslow) test, which weights early events more heavily, may be preferable.</p>
      </div>
    ),
    prerequisites: ['kaplan-meier'],
    chapterOrigin: 'ch6',
    category: 'survival',
  },

  'weibull-distribution': {
    id: 'weibull-distribution',
    displayName: 'Weibull Distribution',
    shortDefinition: 'A flexible parametric survival distribution that can model increasing, decreasing, or constant hazards.',
    content: (
      <div className="space-y-2">
        <p>The Weibull hazard function is <MathBlock tex="h(t) = \lambda p (\lambda t)^{p-1}" />, where <MathBlock tex="\lambda" /> is the scale and p is the shape parameter. When p = 1, it reduces to the exponential (constant hazard). When p &gt; 1, the hazard increases over time (aging). When p &lt; 1, the hazard decreases (infant mortality).</p>
        <p>Weibull regression is a fully parametric alternative to Cox. The advantage is that you can estimate the baseline hazard directly and extrapolate beyond the observation period. The cost is the assumption that the hazard follows a specific shape.</p>
      </div>
    ),
    prerequisites: ['hazard-function'],
    chapterOrigin: 'ch6',
    category: 'survival',
  },

  'baseline-hazard': {
    id: 'baseline-hazard',
    displayName: 'Baseline Hazard',
    shortDefinition: 'The hazard function when all covariates equal zero — the underlying risk profile before adjusting for predictors.',
    content: (
      <div className="space-y-2">
        <p>In the Cox model <MathBlock tex="h(t|X) = h_0(t)\exp(X\beta)" />, the baseline hazard <MathBlock tex="h_0(t)" /> captures how risk evolves over time for a "reference" individual (all covariates at zero). Covariates then shift this baseline up or down multiplicatively.</p>
        <p>The beauty of the Cox model is that <MathBlock tex="h_0(t)" /> is left completely unspecified — you don't need to assume it has any particular shape. If you do want to estimate it (for prediction or plotting), the Breslow estimator provides a step-function estimate after fitting the Cox model.</p>
      </div>
    ),
    prerequisites: ['cox-model'],
    chapterOrigin: 'ch6',
    category: 'survival',
  },

  // ── Discrete Choice ─────────────────────────────────────────

  'utility-function': {
    id: 'utility-function',
    displayName: 'Utility Function',
    shortDefinition: 'A mathematical representation of a decision-maker\'s preferences over alternatives.',
    content: (
      <div className="space-y-2">
        <p>In discrete choice models, each alternative j has a utility <MathBlock tex="U_j = V_j + \epsilon_j" />, where <MathBlock tex="V_j = X_j\beta" /> is the systematic (observable) component and <MathBlock tex="\epsilon_j" /> is the random (unobservable) component.</p>
        <p>The decision-maker chooses the alternative with the highest utility. Since we don't observe <MathBlock tex="\epsilon" />, we model the probability of each choice. The assumed distribution of the error term determines the model type: extreme value errors give the multinomial logit; normal errors give the multinomial probit.</p>
      </div>
    ),
    prerequisites: [],
    chapterOrigin: 'ch7',
    category: 'choice',
  },

  'random-utility-model': {
    id: 'random-utility-model',
    displayName: 'Random Utility Model (RUM)',
    shortDefinition: 'A framework where choices are driven by utility maximization with a random component capturing unobserved preferences.',
    content: (
      <div className="space-y-2">
        <p>The RUM framework is the theoretical foundation for all discrete choice models. A decision-maker n facing alternatives <MathBlock tex="j = 1, \ldots, J" /> chooses the one with the highest utility: <MathBlock tex="U_{nj} = V_{nj} + \epsilon_{nj}" />.</p>
        <p>The probability that alternative i is chosen equals <MathBlock tex="P(i) = P(U_{ni} > U_{nj} \; \forall j \neq i)" />. Different assumptions about the distribution of the error terms lead to different models and different computational procedures, but they all share this utility-maximizing foundation.</p>
      </div>
    ),
    prerequisites: ['utility-function'],
    chapterOrigin: 'ch7',
    category: 'choice',
  },

  'multinomial-logit': {
    id: 'multinomial-logit',
    displayName: 'Multinomial Logit (MNL)',
    shortDefinition: 'A choice model for selecting among 3+ unordered alternatives, assuming independent error terms.',
    content: (
      <div className="space-y-2">
        <p>The MNL model gives the probability of choosing alternative i from J options:</p>
        <MathBlock tex="P(i|J) = \frac{e^{V_i}}{\sum_{j=1}^{J}e^{V_j}}" display />
        <p>This closed-form expression makes MNL computationally attractive. However, it relies on the Independence of Irrelevant Alternatives (IIA) assumption: the ratio <MathBlock tex="P(i)/P(j)" /> is independent of what other alternatives exist. This can be unrealistic when some alternatives are similar (e.g., two bus routes competing with a car). When IIA is violated, nested logit or mixed logit are preferred.</p>
      </div>
    ),
    prerequisites: ['logistic-regression', 'utility-function'],
    chapterOrigin: 'ch7',
    category: 'choice',
  },

  'iia': {
    id: 'iia',
    displayName: 'Independence of Irrelevant Alternatives (IIA)',
    shortDefinition: 'The property that the relative probability of choosing between two alternatives is unaffected by other options.',
    content: (
      <div className="space-y-2">
        <p>IIA means <MathBlock tex="P(i)/P(j)" /> stays the same regardless of what other alternatives are available. The classic counterexample is the "red bus / blue bus" problem: adding a blue bus (identical to an existing red bus) should steal riders mainly from the red bus, but MNL predicts it steals proportionally from all alternatives, including car.</p>
        <p>Test IIA with the Hausman-McFadden test: estimate the model with all alternatives, then re-estimate after removing one. If coefficients change significantly, IIA is violated. When IIA fails, use nested logit (groups similar alternatives) or mixed logit (allows flexible substitution patterns).</p>
      </div>
    ),
    prerequisites: ['multinomial-logit'],
    chapterOrigin: 'ch7',
    category: 'choice',
  },

  'nested-logit': {
    id: 'nested-logit',
    displayName: 'Nested Logit',
    shortDefinition: 'A choice model that groups similar alternatives into nests, allowing correlation within nests to relax IIA.',
    content: (
      <div className="space-y-2">
        <p>Nested logit organizes alternatives into a tree structure. Alternatives within the same nest can be correlated (their error terms share a common component), while alternatives in different nests remain independent.</p>
        <p>Example: in transportation choice, "car" might be one nest and "public transit" another, containing "bus" and "train." Adding a new bus route primarily steals from other public transit options rather than proportionally from all. The nesting parameter measures the degree of correlation within each nest — when it equals 1, the model collapses to MNL.</p>
      </div>
    ),
    prerequisites: ['multinomial-logit', 'iia'],
    chapterOrigin: 'ch7',
    category: 'choice',
  },

  'mixed-logit': {
    id: 'mixed-logit',
    displayName: 'Mixed Logit',
    shortDefinition: 'A flexible choice model that allows coefficients to vary randomly across individuals, capturing preference heterogeneity.',
    content: (
      <div className="space-y-2">
        <p>Mixed logit (also called random parameters logit) allows each person to have their own coefficients drawn from a distribution (e.g., normal, log-normal). The choice probability is an integral over all possible coefficient values:</p>
        <MathBlock tex="P(i) = \int \frac{e^{V_i(\beta)}}{\sum_j e^{V_j(\beta)}} f(\beta) \, d\beta" display />
        <p>This is the most flexible discrete choice model — it relaxes IIA, captures taste variation, and can approximate any random utility model. The downside is computational: the integral has no closed form and must be evaluated by simulation (simulated maximum likelihood).</p>
      </div>
    ),
    prerequisites: ['multinomial-logit'],
    chapterOrigin: 'ch7',
    category: 'choice',
  },

  'choice-probability': {
    id: 'choice-probability',
    displayName: 'Choice Probability',
    shortDefinition: 'The predicted probability that a decision-maker selects a particular alternative from the available set.',
    content: (
      <div className="space-y-2">
        <p>In any discrete choice model, the choice probability for alternative i is derived from the random utility framework: <MathBlock tex="P(i) = P(U_i \ge U_j \; \forall j)" />. The specific formula depends on the distributional assumption for the error terms.</p>
        <p>Choice probabilities must sum to 1 across all alternatives and be between 0 and 1 for each. They are the key output of discrete choice models — used for market share prediction, policy simulation ("what if we change the price of option A?"), and computing marginal effects.</p>
      </div>
    ),
    prerequisites: ['multinomial-logit'],
    chapterOrigin: 'ch7',
    category: 'choice',
  },

  // ── Instrumental Variables ──────────────────────────────────

  'endogeneity': {
    id: 'endogeneity',
    displayName: 'Endogeneity',
    shortDefinition: 'When a predictor is correlated with the error term, causing OLS estimates to be biased and inconsistent.',
    content: (
      <div className="space-y-2">
        <p>Endogeneity means <MathBlock tex="\text{Cov}(X, \epsilon) \neq 0" />, violating a core OLS assumption. Three main sources: (1) omitted variables that correlate with both X and Y, (2) measurement error in X, and (3) simultaneity (X affects Y and Y affects X).</p>
        <p>Under endogeneity, OLS is biased in finite samples and inconsistent — more data doesn't help. The direction of bias depends on the sign and magnitude of the correlation. Instrumental variables (2SLS) is the primary remedy: find an instrument correlated with the endogenous X but uncorrelated with the error.</p>
      </div>
    ),
    prerequisites: ['ols'],
    chapterOrigin: 'ch8',
    category: 'iv',
  },

  'instrumental-variable': {
    id: 'instrumental-variable',
    displayName: 'Instrumental Variable (IV)',
    shortDefinition: 'A variable correlated with the endogenous regressor but uncorrelated with the error term, used to identify causal effects.',
    content: (
      <div className="space-y-2">
        <p>A valid instrument Z must satisfy two conditions: (1) <strong>Relevance:</strong> Z is correlated with the endogenous X — <MathBlock tex="\text{Cov}(Z, X) \neq 0" />, and (2) <strong>Exclusion restriction:</strong> Z affects Y only through X — <MathBlock tex="\text{Cov}(Z, \epsilon) = 0" />.</p>
        <p>Finding good instruments is the hardest part of IV estimation. Classic examples: draft lottery as an instrument for military service, geographic distance as an instrument for college attendance, rainfall as an instrument for agricultural output. Condition (1) is testable (first-stage F-statistic); condition (2) is not directly testable and must be argued on theoretical grounds.</p>
      </div>
    ),
    prerequisites: ['endogeneity'],
    chapterOrigin: 'ch8',
    category: 'iv',
  },

  'two-stage-least-squares': {
    id: 'two-stage-least-squares',
    displayName: 'Two-Stage Least Squares (2SLS)',
    shortDefinition: 'An IV estimation method that first predicts the endogenous variable using instruments, then uses the predicted values in the main regression.',
    content: (
      <div className="space-y-2">
        <p><strong>Stage 1:</strong> Regress the endogenous X on the instrument(s) Z and other exogenous variables: <MathBlock tex="X = Z\pi + W\gamma + v" />. Save the predicted values <MathBlock tex="\hat{X}" />.</p>
        <p><strong>Stage 2:</strong> Regress Y on <MathBlock tex="\hat{X}" /> and other exogenous variables: <MathBlock tex="Y = \hat{X}\beta + W\delta + u" />.</p>
        <p>The fitted values <MathBlock tex="\hat{X}" /> contain only the variation in X that comes from Z (the "clean" part uncorrelated with the error). The resulting <MathBlock tex="\hat{\beta}" /> is consistent even under endogeneity. Standard errors from naive stage 2 are wrong — use proper 2SLS software that adjusts them.</p>
      </div>
    ),
    prerequisites: ['instrumental-variable', 'ols'],
    chapterOrigin: 'ch8',
    category: 'iv',
  },

  'omitted-variable-bias': {
    id: 'omitted-variable-bias',
    displayName: 'Omitted Variable Bias',
    shortDefinition: 'Bias in OLS estimates caused by excluding a relevant variable that correlates with both an included predictor and the outcome.',
    content: (
      <div className="space-y-2">
        <p>If a variable W affects Y and is correlated with X, omitting W from the regression biases the coefficient on X. The direction is:</p>
        <MathBlock tex="\text{Bias}(\hat{\beta}_X) = \beta_W \cdot \frac{\text{Cov}(X, W)}{\text{Var}(X)}" display />
        <p>The bias is positive when X and the omitted variable are positively correlated and the omitted variable has a positive effect on Y (or both negative). Understanding OVB direction helps assess whether your estimate is an upper or lower bound on the true effect. Solutions: include the variable, use proxies, find instruments, or use panel data with fixed effects.</p>
      </div>
    ),
    prerequisites: ['ols', 'endogeneity'],
    chapterOrigin: 'ch8',
    category: 'iv',
  },

  'exclusion-restriction': {
    id: 'exclusion-restriction',
    displayName: 'Exclusion Restriction',
    shortDefinition: 'The requirement that an instrument affects the outcome only through the endogenous variable, not directly.',
    content: (
      <div className="space-y-2">
        <p>The exclusion restriction states <MathBlock tex="\text{Cov}(Z, \epsilon) = 0" />: the instrument Z has no direct effect on Y and no correlation with omitted variables. This is the untestable condition that makes IV analysis credible.</p>
        <p>It cannot be proven with data — it must be argued using economic theory, institutional knowledge, or research design. For example, using distance to college as an instrument for education requires arguing that distance doesn't directly affect earnings (except through its effect on educational attainment). This is often the most debated aspect of any IV study.</p>
      </div>
    ),
    prerequisites: ['instrumental-variable'],
    chapterOrigin: 'ch8',
    category: 'iv',
  },

  'weak-instruments': {
    id: 'weak-instruments',
    displayName: 'Weak Instruments',
    shortDefinition: 'Instruments that are only weakly correlated with the endogenous variable, leading to biased and unreliable IV estimates.',
    content: (
      <div className="space-y-2">
        <p>If the instrument Z is only weakly correlated with X, the first stage explains little variation, and the 2SLS estimator becomes biased toward OLS. Even with large samples, weak instruments cause: (1) bias nearly as bad as OLS, (2) misleading confidence intervals, and (3) size distortions in hypothesis tests.</p>
        <p>Rule of thumb: the first-stage F-statistic should exceed 10 (Staiger-Stock rule). More precise tests include the Stock-Yogo critical values. If instruments are weak, consider finding stronger instruments, using LIML (less biased with weak instruments), or using the Anderson-Rubin confidence set.</p>
      </div>
    ),
    prerequisites: ['instrumental-variable'],
    chapterOrigin: 'ch8',
    category: 'iv',
  },

  'first-stage': {
    id: 'first-stage',
    displayName: 'First Stage (of 2SLS)',
    shortDefinition: 'The initial regression of the endogenous variable on instruments, used to assess instrument relevance.',
    content: (
      <div className="space-y-2">
        <p>In 2SLS, the first stage regresses the endogenous X on the excluded instrument(s) Z and all exogenous variables: <MathBlock tex="X = Z\pi + W\gamma + v" />. The key diagnostic is the F-statistic on the excluded instruments.</p>
        <p>A strong first stage (F &gt; 10) means the instruments have meaningful predictive power for X. Report the first-stage F and the coefficient on Z — they establish instrument relevance. A significant first stage is necessary but not sufficient for valid IV; you still need the exclusion restriction to hold.</p>
      </div>
    ),
    prerequisites: ['two-stage-least-squares'],
    chapterOrigin: 'ch8',
    category: 'iv',
  },

  'sargan-test': {
    id: 'sargan-test',
    displayName: 'Sargan Test (Overidentification)',
    shortDefinition: 'A test of whether instruments are valid when you have more instruments than endogenous variables.',
    content: (
      <div className="space-y-2">
        <p>When you have more instruments than endogenous variables (the model is over-identified), the Sargan/Hansen J-test checks whether the extra instruments are consistent with each other. The null hypothesis is that all instruments are valid (uncorrelated with the error).</p>
        <p>Rejection suggests at least one instrument violates the exclusion restriction. However, failure to reject doesn't prove instruments are valid — it only means they agree with each other. If all instruments are invalid in the same direction, the test has no power. Think of it as a necessary but not sufficient check on instrument quality.</p>
      </div>
    ),
    prerequisites: ['two-stage-least-squares'],
    chapterOrigin: 'ch8',
    category: 'iv',
  },

  // ── Clustering ──────────────────────────────────────────────

  'unsupervised-learning': {
    id: 'unsupervised-learning',
    displayName: 'Unsupervised Learning',
    shortDefinition: 'Machine learning methods that find structure in data without labeled outcomes.',
    content: (
      <div className="space-y-2">
        <p>Unlike supervised learning (regression, classification) where you have a target variable Y, unsupervised learning works with only features X. The goal is to discover hidden patterns: clusters, latent factors, dimensionality reduction, or anomalies.</p>
        <p>There's no "correct answer" to evaluate against, which makes assessing quality harder. You rely on internal metrics (silhouette score, within-cluster variance) and domain expertise. Common applications: customer segmentation, anomaly detection, feature extraction, and data compression.</p>
      </div>
    ),
    prerequisites: [],
    chapterOrigin: 'ch9',
    category: 'clustering',
  },

  'k-means': {
    id: 'k-means',
    displayName: 'K-Means Clustering',
    shortDefinition: 'A partitioning algorithm that assigns observations to K clusters by minimizing within-cluster sum of squared distances.',
    content: (
      <div className="space-y-2">
        <p>K-means iterates between two steps: (1) assign each point to the nearest centroid, (2) recompute centroids as the mean of assigned points. It minimizes:</p>
        <MathBlock tex="\min_{C_1,\ldots,C_K} \sum_{k=1}^{K}\sum_{x_i \in C_k} \|x_i - \mu_k\|^2" display />
        <p>You must choose K in advance — use the elbow method or silhouette analysis. K-means finds spherical, equally-sized clusters. It's sensitive to initialization (run it multiple times) and outliers. Always standardize features first, since K-means uses Euclidean distance.</p>
      </div>
    ),
    prerequisites: ['unsupervised-learning', 'euclidean-distance'],
    chapterOrigin: 'ch9',
    category: 'clustering',
  },

  'hierarchical-clustering': {
    id: 'hierarchical-clustering',
    displayName: 'Hierarchical Clustering',
    shortDefinition: 'A clustering method that builds a tree (dendrogram) of nested clusters by iteratively merging or splitting.',
    content: (
      <div className="space-y-2">
        <p>Agglomerative (bottom-up) hierarchical clustering starts with each point as its own cluster and repeatedly merges the two closest clusters. The choice of "closest" is the linkage criterion: single (minimum distance), complete (maximum distance), average, or Ward's (minimum variance increase).</p>
        <p>The result is a dendrogram — a tree showing the merge history. You "cut" the tree at a height to get a specific number of clusters. Advantages over K-means: no need to pre-specify K, produces a hierarchy of clusters, and works with any distance metric. Disadvantage: doesn't scale well to large datasets (O(n²) memory).</p>
      </div>
    ),
    prerequisites: ['unsupervised-learning', 'euclidean-distance'],
    chapterOrigin: 'ch9',
    category: 'clustering',
  },

  'dbscan': {
    id: 'dbscan',
    displayName: 'DBSCAN',
    shortDefinition: 'A density-based clustering algorithm that finds arbitrarily shaped clusters and identifies outliers as noise.',
    content: (
      <div className="space-y-2">
        <p>DBSCAN (Density-Based Spatial Clustering of Applications with Noise) has two parameters: <MathBlock tex="\epsilon" /> (neighborhood radius) and minPts (minimum points to form a dense region). Points are classified as: core (≥ minPts within ε), border (within ε of a core point), or noise (neither).</p>
        <p>Key advantages: automatically determines the number of clusters, finds non-spherical shapes, and naturally identifies outliers. Disadvantages: struggles with clusters of varying densities, sensitive to ε and minPts choices. Use a k-distance plot to choose ε (look for the "elbow").</p>
      </div>
    ),
    prerequisites: ['unsupervised-learning', 'euclidean-distance'],
    chapterOrigin: 'ch9',
    category: 'clustering',
  },

  'silhouette-score': {
    id: 'silhouette-score',
    displayName: 'Silhouette Score',
    shortDefinition: 'A measure of how well each point fits its assigned cluster versus the nearest neighboring cluster.',
    content: (
      <div className="space-y-2">
        <MathBlock tex="s(i) = \frac{b(i) - a(i)}{\max(a(i), b(i))}" display />
        <p>where a(i) is the average distance to points in the same cluster and b(i) is the average distance to points in the nearest other cluster. Values range from −1 (wrong cluster) to +1 (well-matched). A negative silhouette suggests the point may be misassigned.</p>
        <p>The average silhouette across all points summarizes cluster quality. Compare across different K values — the K with the highest average silhouette is often a good choice. Silhouette analysis is more informative than the elbow method because it evaluates individual point assignments.</p>
      </div>
    ),
    prerequisites: ['k-means'],
    chapterOrigin: 'ch9',
    category: 'clustering',
  },

  'dendrogram': {
    id: 'dendrogram',
    displayName: 'Dendrogram',
    shortDefinition: 'A tree diagram showing the hierarchy of cluster merges in hierarchical clustering.',
    content: (
      <div className="space-y-2">
        <p>A dendrogram visually represents the sequence and distance of cluster merges. The y-axis shows the distance (or dissimilarity) at which each merge occurs. Leaves at the bottom are individual observations; the root at the top is a single cluster containing everything.</p>
        <p>To get K clusters, draw a horizontal line that crosses exactly K vertical lines. Large jumps in merge distance suggest a natural number of clusters — cut just below a big jump. Dendrograms are invaluable for exploring hierarchical structure in data and deciding how many clusters to retain.</p>
      </div>
    ),
    prerequisites: ['hierarchical-clustering'],
    chapterOrigin: 'ch9',
    category: 'clustering',
  },

  'ward-linkage': {
    id: 'ward-linkage',
    displayName: "Ward's Linkage",
    shortDefinition: 'A hierarchical clustering linkage that merges the pair of clusters causing the smallest increase in total within-cluster variance.',
    content: (
      <div className="space-y-2">
        <p>Ward's method minimizes the total within-cluster sum of squares at each merge step. When considering merging clusters A and B, it computes the increase in variance: <MathBlock tex="\Delta = \frac{n_A n_B}{n_A + n_B}\|\mu_A - \mu_B\|^2" />.</p>
        <p>Ward's tends to produce compact, roughly equal-sized clusters — similar to what K-means finds. It's the most popular linkage for general-purpose clustering. It works best with Euclidean distance and may not be appropriate with other distance metrics.</p>
      </div>
    ),
    prerequisites: ['hierarchical-clustering'],
    chapterOrigin: 'ch9',
    category: 'clustering',
  },

  'elbow-method': {
    id: 'elbow-method',
    displayName: 'Elbow Method',
    shortDefinition: 'A heuristic for choosing K in K-means by plotting within-cluster variance and looking for a bend.',
    content: (
      <div className="space-y-2">
        <p>Plot the total within-cluster sum of squares (WCSS) against K = 1, 2, 3, ... The WCSS always decreases as K increases, but the rate of decrease slows. The "elbow" — the point where adding another cluster gives diminishing returns — suggests a good K.</p>
        <p>The elbow method is intuitive but subjective: the "elbow" isn't always clear. Combine it with the silhouette score and domain knowledge. For example, if you're doing customer segmentation for marketing, the number of clusters should also be actionable — 3-5 segments you can actually target differently.</p>
      </div>
    ),
    prerequisites: ['k-means'],
    chapterOrigin: 'ch9',
    category: 'clustering',
  },

  'centroid': {
    id: 'centroid',
    displayName: 'Centroid',
    shortDefinition: 'The mean point of a cluster, serving as its representative center in K-means.',
    content: (
      <div className="space-y-2">
        <p>The centroid of cluster <MathBlock tex="C_k" /> is the vector of feature-wise means: <MathBlock tex="\mu_k = \frac{1}{|C_k|}\sum_{x_i \in C_k} x_i" />. In K-means, each point is assigned to the nearest centroid, and centroids are recomputed iteratively.</p>
        <p>Centroids serve as the "profile" of each cluster — you interpret clusters by comparing centroid values. For example, if a customer segment's centroid has high spending and low frequency, you might label it "big spenders." Note that centroids are sensitive to outliers because they use the mean, not the median.</p>
      </div>
    ),
    prerequisites: ['k-means'],
    chapterOrigin: 'ch9',
    category: 'clustering',
  },

  // ── Text Mining ─────────────────────────────────────────────

  'tokenization': {
    id: 'tokenization',
    displayName: 'Tokenization',
    shortDefinition: 'The process of splitting raw text into individual units (words, subwords, or characters) for analysis.',
    content: (
      <div className="space-y-2">
        <p>Tokenization is the first step in any text mining pipeline. The simplest approach splits on whitespace and punctuation, but real text requires handling contractions ("don't" → "do" + "n't"), hyphenated words, URLs, hashtags, and emojis.</p>
        <p>The output is a sequence of tokens that become the vocabulary for downstream representations (bag of words, TF-IDF). The choice of tokenizer affects everything that follows — different tokenizers can produce different vocabularies and therefore different model results.</p>
      </div>
    ),
    prerequisites: [],
    chapterOrigin: 'ch10',
    category: 'text',
  },

  'stemming': {
    id: 'stemming',
    displayName: 'Stemming',
    shortDefinition: 'Reducing words to their root form by stripping suffixes, without guaranteeing the result is a real word.',
    content: (
      <div className="space-y-2">
        <p>Stemming applies rule-based suffix stripping: "running" → "run", "studies" → "studi", "organization" → "organ". The Porter and Snowball stemmers are the most common. It reduces vocabulary size so that inflected forms of the same word are treated as identical.</p>
        <p>The advantage is speed and simplicity. The disadvantage is over-stemming (merging unrelated words: "university" and "universe") or under-stemming (failing to merge related words). Lemmatization is the more accurate but slower alternative.</p>
      </div>
    ),
    prerequisites: ['tokenization'],
    chapterOrigin: 'ch10',
    category: 'text',
  },

  'lemmatization': {
    id: 'lemmatization',
    displayName: 'Lemmatization',
    shortDefinition: 'Reducing words to their dictionary form (lemma) using vocabulary and morphological analysis.',
    content: (
      <div className="space-y-2">
        <p>Unlike stemming, lemmatization uses a dictionary and part-of-speech information to find the true base form: "better" → "good", "ran" → "run", "studies" → "study". The result is always a valid word.</p>
        <p>Lemmatization is more accurate than stemming but slower and requires a language model. In practice, the choice between stemming and lemmatization often makes little difference for tasks like topic modeling or classification, but lemmatization is preferred for sentiment analysis where word meaning matters more.</p>
      </div>
    ),
    prerequisites: ['tokenization'],
    chapterOrigin: 'ch10',
    category: 'text',
  },

  'bag-of-words': {
    id: 'bag-of-words',
    displayName: 'Bag of Words (BoW)',
    shortDefinition: 'A text representation that counts word occurrences, ignoring order and grammar.',
    content: (
      <div className="space-y-2">
        <p>Bag of Words represents each document as a vector of word counts (or binary indicators). A corpus of N documents with V unique words produces an N × V document-term matrix. Word order is discarded — "dog bites man" and "man bites dog" get the same representation.</p>
        <p>BoW is simple and effective for many tasks (classification, topic modeling) but has limitations: it ignores word order and context, and creates very high-dimensional, sparse vectors. It's typically used with TF-IDF weighting rather than raw counts to reduce the dominance of common words.</p>
      </div>
    ),
    prerequisites: ['tokenization'],
    chapterOrigin: 'ch10',
    category: 'text',
  },

  'tf-idf': {
    id: 'tf-idf',
    displayName: 'TF-IDF',
    shortDefinition: 'A weighting scheme that highlights words important to a document but rare across the corpus.',
    content: (
      <div className="space-y-2">
        <MathBlock tex="\text{tfidf}(t, d) = \text{tf}(t, d) \times \log\frac{N}{\text{df}(t)}" display />
        <p>Term Frequency (tf) measures how often a word appears in a document. Inverse Document Frequency (idf) downweights words that appear in many documents (like "the" or "is"). The product gives high weight to words that are frequent in a specific document but rare overall — exactly the words that distinguish that document.</p>
        <p>TF-IDF is the most common feature representation for text classification, document retrieval, and similarity measurement. It's the default upgrade from raw bag-of-words counts.</p>
      </div>
    ),
    prerequisites: ['bag-of-words'],
    chapterOrigin: 'ch10',
    category: 'text',
  },

  'sentiment-analysis': {
    id: 'sentiment-analysis',
    displayName: 'Sentiment Analysis',
    shortDefinition: 'Automatically determining the emotional tone (positive, negative, neutral) of text.',
    content: (
      <div className="space-y-2">
        <p>Sentiment analysis classifies text by polarity. Approaches range from simple to complex: (1) lexicon-based methods use dictionaries of words with pre-assigned sentiment scores, (2) supervised ML trains classifiers on labeled data, and (3) deep learning models (BERT, transformers) capture context and nuance.</p>
        <p>Challenges include sarcasm ("great, another meeting"), negation ("not bad"), domain-specific language, and context dependence ("the battery died" vs. "to die for"). Lexicon methods are fast but crude; ML methods require labeled training data but handle domain specifics better.</p>
      </div>
    ),
    prerequisites: ['bag-of-words'],
    chapterOrigin: 'ch10',
    category: 'text',
  },

  'lda-topic-model': {
    id: 'lda-topic-model',
    displayName: 'Latent Dirichlet Allocation (LDA)',
    shortDefinition: 'A generative probabilistic model that discovers hidden topics in a corpus of documents.',
    content: (
      <div className="space-y-2">
        <p>LDA assumes each document is a mixture of topics, and each topic is a distribution over words. The model infers: (1) per-document topic proportions (what each document is about), and (2) per-topic word distributions (what each topic means).</p>
        <p>For example, a news corpus might reveal topics like "politics" (with high-probability words: election, vote, candidate) and "sports" (game, score, team). You specify the number of topics K in advance. LDA uses variational inference or Gibbs sampling for estimation. Evaluate with coherence scores and qualitative inspection of top words per topic.</p>
      </div>
    ),
    prerequisites: ['bag-of-words', 'mle'],
    chapterOrigin: 'ch10',
    category: 'text',
  },

  'cosine-similarity': {
    id: 'cosine-similarity',
    displayName: 'Cosine Similarity',
    shortDefinition: 'A measure of similarity between two vectors based on the cosine of the angle between them, ignoring magnitude.',
    content: (
      <div className="space-y-2">
        <MathBlock tex="\cos(\theta) = \frac{A \cdot B}{\|A\|\|B\|} = \frac{\sum a_i b_i}{\sqrt{\sum a_i^2}\sqrt{\sum b_i^2}}" display />
        <p>Cosine similarity ranges from −1 (opposite) to +1 (identical direction), with 0 meaning no relationship. For TF-IDF vectors (which are non-negative), it ranges from 0 to 1. It's the standard similarity metric for text because it focuses on the pattern of word usage, not document length — a short and long document about the same topic will have high cosine similarity.</p>
      </div>
    ),
    prerequisites: ['tf-idf'],
    chapterOrigin: 'ch10',
    category: 'text',
  },

  'n-gram': {
    id: 'n-gram',
    displayName: 'N-gram',
    shortDefinition: 'A contiguous sequence of N tokens, capturing local word order and common phrases.',
    content: (
      <div className="space-y-2">
        <p>Unigrams are single words, bigrams are pairs ("machine learning", "New York"), trigrams are triples. N-grams partially restore word order that bag-of-words discards. Including bigrams alongside unigrams in your vocabulary can capture important phrases.</p>
        <p>The trade-off: larger N captures more context but explodes the vocabulary size and creates sparser representations. In practice, unigrams + bigrams is a common sweet spot. N-grams are also used in language modeling — the probability of a word given its N−1 predecessors.</p>
      </div>
    ),
    prerequisites: ['tokenization'],
    chapterOrigin: 'ch10',
    category: 'text',
  },

  'document-term-matrix': {
    id: 'document-term-matrix',
    displayName: 'Document-Term Matrix',
    shortDefinition: 'A matrix where rows are documents, columns are terms, and cells contain counts or weights.',
    content: (
      <div className="space-y-2">
        <p>The DTM is the numerical representation of a text corpus. Each row corresponds to a document, each column to a unique term in the vocabulary, and each cell contains the count (or TF-IDF weight) of that term in that document.</p>
        <p>DTMs are typically very sparse (most cells are zero) because any single document uses only a small fraction of the vocabulary. Sparse matrix formats are essential for efficiency. The DTM is the input to text classification, topic modeling, and clustering algorithms.</p>
      </div>
    ),
    prerequisites: ['bag-of-words'],
    chapterOrigin: 'ch10',
    category: 'text',
  },

  'stop-words': {
    id: 'stop-words',
    displayName: 'Stop Words',
    shortDefinition: 'Very common words (the, is, at, and, etc.) that carry little meaning and are typically removed before analysis.',
    content: (
      <div className="space-y-2">
        <p>Stop words are high-frequency, low-information words that add noise to text analysis. Removing them reduces vocabulary size and computational cost. Most NLP libraries provide default stop word lists for common languages.</p>
        <p>However, removal isn't always appropriate. In sentiment analysis, negation words ("not", "no", "never") are stop words that carry crucial meaning. In phrase detection, "to be or not to be" loses its identity without stop words. Consider your task carefully before applying a standard stop word list.</p>
      </div>
    ),
    prerequisites: ['tokenization'],
    chapterOrigin: 'ch10',
    category: 'text',
  },

  // ── Neural Networks ─────────────────────────────────────────

  'perceptron': {
    id: 'perceptron',
    displayName: 'Perceptron',
    shortDefinition: 'The simplest neural network unit — a weighted sum of inputs passed through an activation function.',
    content: (
      <div className="space-y-2">
        <MathBlock tex="y = f\left(\sum_{i=1}^{n} w_i x_i + b\right) = f(W^T X + b)" display />
        <p>The perceptron takes inputs, multiplies each by a weight, sums them, adds a bias, and applies an activation function. A single perceptron can only learn linearly separable patterns (like AND and OR, but not XOR). Stacking perceptrons into layers creates a multi-layer perceptron (MLP) that can learn arbitrarily complex functions.</p>
      </div>
    ),
    prerequisites: ['regression'],
    chapterOrigin: 'ch11',
    category: 'neural',
  },

  'activation-function': {
    id: 'activation-function',
    displayName: 'Activation Function',
    shortDefinition: 'A nonlinear function applied to a neuron\'s output, enabling the network to learn complex patterns.',
    content: (
      <div className="space-y-2">
        <p>Without activation functions, a neural network is just a series of linear transformations — equivalent to a single linear layer. Activation functions introduce nonlinearity, which is what gives neural networks their power.</p>
        <p>Common choices: <strong>Sigmoid</strong> <MathBlock tex="\sigma(z) = 1/(1+e^{-z})" /> — smooth, bounded (0,1), but suffers from vanishing gradients. <strong>tanh</strong> — zero-centered, bounded (−1,1). <strong>ReLU</strong> <MathBlock tex="f(z) = \max(0,z)" /> — simple, fast, the modern default. <strong>Softmax</strong> — used in the output layer for multi-class classification.</p>
      </div>
    ),
    prerequisites: ['perceptron'],
    chapterOrigin: 'ch11',
    category: 'neural',
  },

  'relu': {
    id: 'relu',
    displayName: 'ReLU (Rectified Linear Unit)',
    shortDefinition: 'An activation function that outputs the input directly if positive, otherwise zero.',
    content: (
      <div className="space-y-2">
        <MathBlock tex="f(z) = \max(0, z)" display />
        <p>ReLU is the default activation function in modern deep learning because it's computationally cheap (no exponentials) and doesn't saturate for positive values (mitigating vanishing gradients). Its derivative is 1 for z &gt; 0 and 0 for z &lt; 0, making gradient computation trivial.</p>
        <p>The "dying ReLU" problem occurs when neurons get stuck at zero and stop learning. Variants like Leaky ReLU (<MathBlock tex="f(z) = \max(0.01z, z)" />) and ELU address this by allowing small negative outputs.</p>
      </div>
    ),
    prerequisites: ['activation-function'],
    chapterOrigin: 'ch11',
    category: 'neural',
  },

  'gradient-descent': {
    id: 'gradient-descent',
    displayName: 'Gradient Descent',
    shortDefinition: 'An optimization algorithm that iteratively adjusts parameters in the direction that reduces the loss function.',
    content: (
      <div className="space-y-2">
        <MathBlock tex="w \leftarrow w - \alpha \frac{\partial L}{\partial w}" display />
        <p>Gradient descent computes the gradient (partial derivatives) of the loss with respect to each parameter and updates the parameters in the opposite direction. The learning rate <MathBlock tex="\alpha" /> controls step size.</p>
        <p>Variants: <strong>Batch GD</strong> uses all data per update (stable but slow). <strong>Stochastic GD (SGD)</strong> uses one sample (noisy but fast). <strong>Mini-batch GD</strong> uses a subset (the practical standard). Modern optimizers (Adam, RMSProp) adapt the learning rate per-parameter for faster convergence.</p>
      </div>
    ),
    prerequisites: [],
    chapterOrigin: 'ch11',
    category: 'neural',
  },

  'learning-rate': {
    id: 'learning-rate',
    displayName: 'Learning Rate',
    shortDefinition: 'A hyperparameter controlling how much to adjust weights during each gradient descent step.',
    content: (
      <div className="space-y-2">
        <p>The learning rate <MathBlock tex="\alpha" /> is the most important hyperparameter in neural network training. Too large: training oscillates or diverges. Too small: training is painfully slow and may get stuck in poor local minima.</p>
        <p>Common strategies: start with a moderate value (0.001 for Adam, 0.01 for SGD), use learning rate scheduling (reduce by a factor when loss plateaus), or use warm-up (start small, increase, then decay). Learning rate finders (plot loss vs. learning rate) help find a good starting value empirically.</p>
      </div>
    ),
    prerequisites: ['gradient-descent'],
    chapterOrigin: 'ch11',
    category: 'neural',
  },

  'backpropagation': {
    id: 'backpropagation',
    displayName: 'Backpropagation',
    shortDefinition: 'An algorithm that computes gradients layer by layer from output to input using the chain rule.',
    content: (
      <div className="space-y-2">
        <p>Backpropagation efficiently computes <MathBlock tex="\partial L / \partial w" /> for every weight in the network by applying the chain rule backwards through the layers. First, the forward pass computes the output and loss. Then, the backward pass propagates the error gradient from the output layer to the input layer.</p>
        <p>For a layer with output <MathBlock tex="z = Wx + b" /> and activation <MathBlock tex="a = f(z)" />, the chain rule gives: <MathBlock tex="\frac{\partial L}{\partial W} = \frac{\partial L}{\partial a} \cdot f'(z) \cdot x^T" />. This is what makes deep learning trainable — without backpropagation, computing gradients for deep networks would be computationally infeasible.</p>
      </div>
    ),
    prerequisites: ['gradient-descent', 'activation-function'],
    chapterOrigin: 'ch11',
    category: 'neural',
  },

  'loss-function': {
    id: 'loss-function',
    displayName: 'Loss Function',
    shortDefinition: 'A function measuring how far the model\'s predictions are from the true values, guiding optimization.',
    content: (
      <div className="space-y-2">
        <p>The loss function quantifies prediction error. Common choices: <strong>MSE</strong> <MathBlock tex="L = \frac{1}{n}\sum(y - \hat{y})^2" /> for regression, <strong>cross-entropy</strong> <MathBlock tex="L = -\sum[y\log\hat{y} + (1-y)\log(1-\hat{y})]" /> for classification, and <strong>MAE</strong> <MathBlock tex="L = \frac{1}{n}\sum|y - \hat{y}|" /> when outlier robustness matters.</p>
        <p>The loss function determines the optimization landscape that gradient descent navigates. Choosing the right loss aligns the model's objective with your business metric — though they're not always the same.</p>
      </div>
    ),
    prerequisites: [],
    chapterOrigin: 'ch11',
    category: 'neural',
  },

  'cross-entropy': {
    id: 'cross-entropy',
    displayName: 'Cross-Entropy Loss',
    shortDefinition: 'The standard loss function for classification, measuring the divergence between predicted probabilities and true labels.',
    content: (
      <div className="space-y-2">
        <p>For binary classification:</p>
        <MathBlock tex="L = -\frac{1}{n}\sum_{i=1}^{n}[y_i\log(\hat{y}_i) + (1-y_i)\log(1-\hat{y}_i)]" display />
        <p>Cross-entropy heavily penalizes confident wrong predictions. If the true label is 1 and the model predicts 0.01, the loss is <MathBlock tex="-\log(0.01) \approx 4.6" /> — much larger than for a prediction of 0.4. This is the same loss function that MLE uses for logistic regression, making the connection between statistics and neural networks clear.</p>
      </div>
    ),
    prerequisites: ['loss-function', 'logistic-regression'],
    chapterOrigin: 'ch11',
    category: 'neural',
  },

  'regularization': {
    id: 'regularization',
    displayName: 'Regularization',
    shortDefinition: 'Techniques that prevent overfitting by penalizing model complexity or adding noise during training.',
    content: (
      <div className="space-y-2">
        <p>Regularization constrains the model to prevent it from fitting noise. Common methods:</p>
        <p><strong>L2 (Ridge):</strong> adds <MathBlock tex="\lambda\sum w_i^2" /> to the loss — shrinks weights toward zero but doesn't eliminate them. <strong>L1 (Lasso):</strong> adds <MathBlock tex="\lambda\sum|w_i|" /> — drives some weights exactly to zero, performing feature selection. <strong>Dropout:</strong> randomly zeroes neurons during training. <strong>Early stopping:</strong> halt training when validation loss starts increasing.</p>
        <p>The regularization strength <MathBlock tex="\lambda" /> controls the bias-variance trade-off. Larger <MathBlock tex="\lambda" /> = simpler model (more bias, less variance).</p>
      </div>
    ),
    prerequisites: ['overfitting'],
    chapterOrigin: 'ch11',
    category: 'neural',
  },

  'universal-approximation': {
    id: 'universal-approximation',
    displayName: 'Universal Approximation Theorem',
    shortDefinition: 'A theorem stating that a neural network with one hidden layer can approximate any continuous function to arbitrary precision.',
    content: (
      <div className="space-y-2">
        <p>The Universal Approximation Theorem (Cybenko, 1989; Hornik, 1991) proves that a feedforward network with a single hidden layer of sufficient width can approximate any continuous function on a compact domain to any desired accuracy.</p>
        <p>This is an existence result, not a practical recipe. It says "a solution exists" but not "you can find it efficiently." In practice, deeper (not just wider) networks often learn better representations with fewer parameters. The theorem reassures us that neural networks have the expressive capacity, but actual performance depends on architecture, training, and data.</p>
      </div>
    ),
    prerequisites: ['perceptron', 'activation-function'],
    chapterOrigin: 'ch11',
    category: 'neural',
  },

  // ── Deep Learning ───────────────────────────────────────────

  'cnn': {
    id: 'cnn',
    displayName: 'Convolutional Neural Network (CNN)',
    shortDefinition: 'A neural network that uses learned spatial filters to automatically extract features from grid-structured data like images.',
    content: (
      <div className="space-y-2">
        <p>CNNs apply small learned filters (kernels) across the input, detecting local patterns like edges, textures, and shapes. A typical architecture stacks: convolutional layers (detect features) → pooling layers (reduce spatial dimensions) → fully connected layers (classify).</p>
        <p>Key properties: <strong>parameter sharing</strong> (the same filter scans the entire input, reducing parameters dramatically) and <strong>translation equivariance</strong> (a pattern is detected regardless of position). CNNs are the standard for image classification, object detection, and many signal processing tasks.</p>
      </div>
    ),
    prerequisites: ['backpropagation', 'convolution-layer'],
    chapterOrigin: 'ch12',
    category: 'deep',
  },

  'convolution-layer': {
    id: 'convolution-layer',
    displayName: 'Convolution Layer',
    shortDefinition: 'A layer that slides learned filters across the input, producing feature maps that detect local patterns.',
    content: (
      <div className="space-y-2">
        <p>A convolution operation slides a small filter (e.g., 3×3) across the input and computes element-wise products summed together at each position:</p>
        <MathBlock tex="(f * g)(t) = \sum_{\tau} f(\tau) \cdot g(t - \tau)" display />
        <p>Each filter learns to detect one type of pattern (horizontal edges, color blobs, etc.). Multiple filters produce multiple feature maps. Hyperparameters include filter size, number of filters, stride (step size), and padding (handling edges). Early layers detect simple features; deeper layers combine them into complex patterns.</p>
      </div>
    ),
    prerequisites: ['perceptron'],
    chapterOrigin: 'ch12',
    category: 'deep',
  },

  'pooling-layer': {
    id: 'pooling-layer',
    displayName: 'Pooling Layer',
    shortDefinition: 'A layer that reduces the spatial dimensions of feature maps by taking the max or average over local regions.',
    content: (
      <div className="space-y-2">
        <p>Pooling (typically max-pooling) takes the maximum value within a small window (e.g., 2×2) and slides it across the feature map. This reduces spatial dimensions by a factor of 2 in each direction, cutting computation by 75%.</p>
        <p>Pooling provides a degree of translation invariance (small shifts in the input don't change the output) and reduces the number of parameters in subsequent layers. Some modern architectures replace pooling with strided convolutions, which can learn what to downsample rather than using a fixed operation.</p>
      </div>
    ),
    prerequisites: ['convolution-layer'],
    chapterOrigin: 'ch12',
    category: 'deep',
  },

  'feature-map': {
    id: 'feature-map',
    displayName: 'Feature Map',
    shortDefinition: 'The output of applying a single convolutional filter to the input, representing where a specific pattern is detected.',
    content: (
      <div className="space-y-2">
        <p>Each convolutional filter produces one feature map — a 2D grid where high values indicate the filter's pattern was detected at that location. If a layer has 64 filters, it produces 64 feature maps stacked into a 3D volume.</p>
        <p>Visualizing feature maps helps interpret what a CNN has learned. Early layers typically detect edges and textures; middle layers detect parts (eyes, wheels); deep layers detect high-level concepts (faces, cars). Feature maps are the CNN's internal representation of the input, progressively more abstract with depth.</p>
      </div>
    ),
    prerequisites: ['convolution-layer'],
    chapterOrigin: 'ch12',
    category: 'deep',
  },

  'rnn': {
    id: 'rnn',
    displayName: 'Recurrent Neural Network (RNN)',
    shortDefinition: 'A neural network with loops that maintains a hidden state, designed for sequential data.',
    content: (
      <div className="space-y-2">
        <p>At each time step t, an RNN updates its hidden state using both the current input and the previous hidden state:</p>
        <MathBlock tex="h_t = f(W_h h_{t-1} + W_x x_t + b)" display />
        <p>This recurrence gives RNNs a form of memory — they can theoretically capture dependencies across the entire sequence. In practice, vanilla RNNs struggle with long-range dependencies due to the vanishing gradient problem. Applications include time series forecasting, language modeling, and machine translation. LSTMs and GRUs address the gradient problem.</p>
      </div>
    ),
    prerequisites: ['backpropagation'],
    chapterOrigin: 'ch12',
    category: 'deep',
  },

  'vanishing-gradient': {
    id: 'vanishing-gradient',
    displayName: 'Vanishing Gradient Problem',
    shortDefinition: 'When gradients become exponentially small during backpropagation through many layers or time steps, preventing learning.',
    content: (
      <div className="space-y-2">
        <p>During backpropagation through a deep network or long sequence, gradients are multiplied at each step. If the multiplication factors are less than 1 (as with sigmoid activations), gradients shrink exponentially: <MathBlock tex="\frac{\partial L}{\partial w_1} = \frac{\partial L}{\partial h_T} \prod_{t=1}^{T}\frac{\partial h_t}{\partial h_{t-1}}" />.</p>
        <p>After just 10-20 steps, gradients can be negligibly small, meaning early layers/time steps barely learn. Solutions: ReLU activation (gradient is 1 for positive values), LSTM/GRU architectures (gating mechanisms maintain gradient flow), residual connections (skip connections add gradients directly), and batch normalization.</p>
      </div>
    ),
    prerequisites: ['backpropagation', 'gradient-descent'],
    chapterOrigin: 'ch12',
    category: 'deep',
  },

  'lstm': {
    id: 'lstm',
    displayName: 'LSTM (Long Short-Term Memory)',
    shortDefinition: 'An RNN variant with gating mechanisms that can learn long-range dependencies by controlling information flow.',
    content: (
      <div className="space-y-2">
        <p>LSTM units have a cell state (long-term memory) and three gates controlling information flow:</p>
        <p><strong>Forget gate:</strong> <MathBlock tex="f_t = \sigma(W_f[h_{t-1}, x_t] + b_f)" /> — what to discard from cell state. <strong>Input gate:</strong> <MathBlock tex="i_t = \sigma(W_i[h_{t-1}, x_t] + b_i)" /> — what new information to add. <strong>Output gate:</strong> <MathBlock tex="o_t = \sigma(W_o[h_{t-1}, x_t] + b_o)" /> — what to output.</p>
        <p>The gates use sigmoid activations (values between 0 and 1) to smoothly control flow. Because the cell state can pass through unchanged (forget gate ≈ 1), gradients can flow over hundreds of time steps, solving the vanishing gradient problem for sequences.</p>
      </div>
    ),
    prerequisites: ['rnn', 'vanishing-gradient'],
    chapterOrigin: 'ch12',
    category: 'deep',
  },

  'dropout': {
    id: 'dropout',
    displayName: 'Dropout',
    shortDefinition: 'A regularization technique that randomly deactivates neurons during training, forcing the network to be robust.',
    content: (
      <div className="space-y-2">
        <MathBlock tex="\hat{y} = f(W \cdot (m \odot x) + b), \quad m_i \sim \text{Bernoulli}(p)" display />
        <p>During each training step, each neuron is randomly "dropped" (set to zero) with probability (1−p). This prevents neurons from co-adapting — each neuron must be useful independently. At test time, all neurons are active but outputs are scaled by p to compensate.</p>
        <p>Dropout can be interpreted as training an ensemble of <MathBlock tex="2^n" /> sub-networks simultaneously. Typical dropout rates: 0.2-0.5 for hidden layers. It's one of the most effective regularizers for neural networks and is nearly universal in modern architectures.</p>
      </div>
    ),
    prerequisites: ['regularization', 'overfitting'],
    chapterOrigin: 'ch12',
    category: 'deep',
  },

  'batch-normalization': {
    id: 'batch-normalization',
    displayName: 'Batch Normalization',
    shortDefinition: 'A technique that normalizes layer inputs within each mini-batch, stabilizing and accelerating training.',
    content: (
      <div className="space-y-2">
        <p>Batch normalization normalizes activations to zero mean and unit variance within each mini-batch, then applies a learned scale and shift:</p>
        <MathBlock tex="\hat{x}_i = \frac{x_i - \mu_B}{\sqrt{\sigma_B^2 + \epsilon}}, \quad y_i = \gamma\hat{x}_i + \beta" display />
        <p>Benefits: allows higher learning rates, reduces sensitivity to initialization, acts as mild regularization. It addresses "internal covariate shift" — the changing distribution of layer inputs as earlier layers update. Placed before or after the activation function (both work, debated). At inference, running averages replace batch statistics.</p>
      </div>
    ),
    prerequisites: ['gradient-descent'],
    chapterOrigin: 'ch12',
    category: 'deep',
  },

  'transfer-learning': {
    id: 'transfer-learning',
    displayName: 'Transfer Learning',
    shortDefinition: 'Reusing a model trained on a large dataset as the starting point for a different but related task.',
    content: (
      <div className="space-y-2">
        <p>Instead of training a deep network from scratch (requiring millions of examples), transfer learning takes a pre-trained model (e.g., ResNet trained on ImageNet) and adapts it to a new task. Common strategies: (1) freeze all layers and train only a new output layer (feature extraction), or (2) fine-tune all layers with a very small learning rate.</p>
        <p>Transfer learning works because early layers learn generic features (edges, textures) that are useful across tasks. It dramatically reduces data requirements and training time. It's standard practice in computer vision, NLP (fine-tuning BERT), and increasingly in tabular data applications.</p>
      </div>
    ),
    prerequisites: ['cnn'],
    chapterOrigin: 'ch12',
    category: 'deep',
  },
}

export function getConcept(id: string): ConceptDefinition | undefined {
  return concepts[id]
}

export function getAllConcepts(): ConceptDefinition[] {
  return Object.values(concepts)
}
