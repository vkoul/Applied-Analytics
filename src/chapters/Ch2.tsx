import { ChapterLayout } from '../components/content/ChapterLayout'
import { ConceptLink } from '../components/tooltip/ConceptLink'
import { MathBlock } from '../components/content/MathBlock'
import { ExpandableReading } from '../components/content/ExpandableReading'
import { KeyTakeaways } from '../components/content/KeyTakeaways'
import { DecisionScenario } from '../components/content/DecisionScenario'
import { QuizSection } from '../components/content/QuizSection'
import { CodeBlock } from '../components/content/CodeBlock'
import { codeExamples } from '../data/codeExamples'
import { ResidualsExplorer } from '../components/widgets/ResidualsExplorer'

export default function Ch2() {
  return (
    <ChapterLayout title="Chapter 2: Linear Models & OLS Regression" subtitle="The foundation of regression analysis">
      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg">
        <h3 className="font-semibold text-blue-800 dark:text-blue-200">Learning Objectives</h3>
        <ul className="list-disc list-inside text-sm text-blue-700 dark:text-blue-300 mt-2 space-y-1">
          <li>Derive and interpret the OLS estimator</li>
          <li>State and test the classical assumptions of linear regression</li>
          <li>Diagnose multicollinearity using VIF and heteroscedasticity using residual plots</li>
          <li>Select among competing models using R², adjusted R², AIC, and BIC</li>
          <li>Apply variable transformations (log, polynomial) to capture nonlinearities</li>
        </ul>
      </div>

      <h2>The Linear Regression Model</h2>
      <p>
        The linear regression model posits a linear relationship between a dependent variable{' '}
        <MathBlock tex="y" /> and a set of explanatory variables <MathBlock tex="X" />:
      </p>
      <MathBlock tex="y = X\beta + \varepsilon" display />
      <p>
        where <MathBlock tex="\beta" /> is the vector of unknown coefficients and{' '}
        <MathBlock tex="\varepsilon" /> is a vector of random error terms. The goal is to estimate{' '}
        <MathBlock tex="\beta" /> from observed data.
      </p>

      <h2>OLS Estimation</h2>
      <p>
        <ConceptLink conceptId="ols">Ordinary Least Squares (OLS)</ConceptLink> minimizes the
        sum of squared <ConceptLink conceptId="residuals">residuals</ConceptLink>:
      </p>
      <MathBlock tex="\min_{\beta} \sum_{i=1}^{n} (y_i - X_i\beta)^2" display />
      <p>
        Setting the derivative to zero and solving yields the OLS estimator:
      </p>
      <MathBlock tex="\hat{\beta} = (X'X)^{-1}X'y" display />
      <p>
        Each coefficient <MathBlock tex="\hat{\beta}_j" /> represents the expected change in{' '}
        <MathBlock tex="y" /> for a one-unit increase in <MathBlock tex="x_j" />, holding all
        other variables constant. This "ceteris paribus" interpretation is what makes multiple
        regression powerful for isolating individual effects.
      </p>

      <h2>Classical Assumptions</h2>
      <p>
        The <ConceptLink conceptId="gauss-markov">Gauss-Markov theorem</ConceptLink> guarantees
        that OLS is the Best Linear Unbiased Estimator (BLUE) under these assumptions:
      </p>
      <ol className="list-decimal list-inside space-y-2 ml-4">
        <li><strong>Linearity:</strong> The true relationship between <MathBlock tex="y" /> and <MathBlock tex="X" /> is linear in parameters.</li>
        <li><strong>Random sampling:</strong> Observations are independently drawn from the population.</li>
        <li><strong>No perfect <ConceptLink conceptId="multicollinearity">multicollinearity</ConceptLink>:</strong> No explanatory variable is a perfect linear combination of others.</li>
        <li><strong>Zero conditional mean:</strong> <MathBlock tex="E[\varepsilon | X] = 0" /> — the errors are uncorrelated with the regressors.</li>
        <li><strong><ConceptLink conceptId="heteroscedasticity">Homoscedasticity</ConceptLink>:</strong> <MathBlock tex="Var(\varepsilon | X) = \sigma^2 I" /> — constant error variance.</li>
      </ol>
      <p>
        For hypothesis testing we additionally assume normality of errors:{' '}
        <MathBlock tex="\varepsilon \sim N(0, \sigma^2 I)" />.
      </p>

      <ResidualsExplorer />

      <ExpandableReading title="Deep Dive: OLS as Maximum Likelihood">
        <p>
          Under normality, OLS and <ConceptLink conceptId="mle">Maximum Likelihood Estimation (MLE)</ConceptLink>{' '}
          produce identical coefficient estimates. The log-likelihood for the normal linear model is:
        </p>
        <MathBlock tex="\ell(\beta, \sigma^2) = -\frac{n}{2}\ln(2\pi\sigma^2) - \frac{1}{2\sigma^2}\sum_{i=1}^n (y_i - X_i\beta)^2" display />
        <p>
          Maximizing this with respect to <MathBlock tex="\beta" /> is equivalent to minimizing the
          sum of squared residuals — exactly what OLS does. This equivalence breaks down for non-normal
          models (logistic, Poisson, etc.), where MLE is the general estimation method.
        </p>
      </ExpandableReading>

      <h2>Goodness of Fit</h2>
      <p>
        <ConceptLink conceptId="r-squared">R-squared</ConceptLink> measures the proportion of
        variance in <MathBlock tex="y" /> explained by the model:
      </p>
      <MathBlock tex="R^2 = 1 - \frac{SS_{res}}{SS_{tot}} = 1 - \frac{\sum(\hat{e}_i)^2}{\sum(y_i - \bar{y})^2}" display />
      <p>
        R² always increases when you add variables, even useless ones. To penalize model complexity, use{' '}
        <ConceptLink conceptId="adjusted-r-squared">adjusted R²</ConceptLink>:
      </p>
      <MathBlock tex="\bar{R}^2 = 1 - \frac{SS_{res}/(n-k-1)}{SS_{tot}/(n-1)}" display />
      <p>
        The <ConceptLink conceptId="f-test">F-test</ConceptLink> tests whether the model as a whole
        is statistically significant — that is, whether at least one coefficient is nonzero:
      </p>
      <MathBlock tex="F = \frac{(SS_{tot} - SS_{res})/k}{SS_{res}/(n-k-1)}" display />

      <h2>Multicollinearity</h2>
      <p>
        <ConceptLink conceptId="multicollinearity">Multicollinearity</ConceptLink> occurs when two
        or more explanatory variables are highly correlated. It doesn't bias OLS estimates, but it
        inflates their standard errors, making individual coefficients unreliable.
      </p>
      <p>
        Detect it using the <ConceptLink conceptId="vif">Variance Inflation Factor (VIF)</ConceptLink>:
      </p>
      <MathBlock tex="VIF_j = \frac{1}{1 - R_j^2}" display />
      <p>
        where <MathBlock tex="R_j^2" /> is the R² from regressing <MathBlock tex="x_j" /> on
        all other explanatory variables. A VIF above 5–10 suggests problematic collinearity.
      </p>
      <p>
        Remedies include dropping one of the correlated variables, combining them into an index,
        or using regularization methods like Ridge regression.
      </p>

      <h2>Heteroscedasticity</h2>
      <p>
        <ConceptLink conceptId="heteroscedasticity">Heteroscedasticity</ConceptLink> means the
        variance of the error term changes across observations — for example, prediction errors
        for high-income households might be larger than for low-income households.
      </p>
      <p>
        Consequences: OLS estimates remain unbiased but are no longer efficient. Standard errors
        are incorrect, leading to invalid hypothesis tests and confidence intervals.
      </p>
      <p>
        Detection: Plot residuals against fitted values; a fan or funnel shape indicates
        heteroscedasticity. Formally, use the Breusch-Pagan test or White test.
      </p>
      <p>
        Remedy: Use <strong>heteroscedasticity-robust standard errors</strong> (White/Huber-White
        standard errors), which correct the standard errors without changing the coefficient estimates.
      </p>

      <h2>Model Selection</h2>
      <p>
        Choosing between competing models requires balancing fit and parsimony. Two information
        criteria are widely used:
      </p>
      <p>
        <ConceptLink conceptId="aic-bic">AIC (Akaike Information Criterion)</ConceptLink>:
      </p>
      <MathBlock tex="AIC = -2\ell(\hat{\beta}) + 2k" display />
      <p>
        <strong>BIC (Bayesian Information Criterion)</strong>:
      </p>
      <MathBlock tex="BIC = -2\ell(\hat{\beta}) + k \ln(n)" display />
      <p>
        Both penalize complexity (more parameters <MathBlock tex="k" />), but BIC penalizes
        more heavily for large samples. Lower values indicate better models. BIC tends to select
        simpler models than AIC.
      </p>

      <h2>Variable Transformations</h2>
      <p>
        When the relationship between variables is nonlinear, transformations can often restore
        linearity while keeping OLS applicable:
      </p>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li>
          <strong>Log-level:</strong> <MathBlock tex="\ln(y) = \beta_0 + \beta_1 x" /> — a
          one-unit increase in <MathBlock tex="x" /> is associated with a{' '}
          <MathBlock tex="100 \times \beta_1" />% change in <MathBlock tex="y" />.
        </li>
        <li>
          <strong>Log-log:</strong> <MathBlock tex="\ln(y) = \beta_0 + \beta_1 \ln(x)" /> —{' '}
          <MathBlock tex="\beta_1" /> is the <strong>elasticity</strong>: a 1% increase in{' '}
          <MathBlock tex="x" /> is associated with a <MathBlock tex="\beta_1" />% change in{' '}
          <MathBlock tex="y" />.
        </li>
        <li>
          <strong>Polynomial:</strong> <MathBlock tex="y = \beta_0 + \beta_1 x + \beta_2 x^2" /> —
          captures U-shaped or inverted-U relationships.
        </li>
      </ul>

      <h2>Dummy Variables</h2>
      <p>
        <ConceptLink conceptId="dummy-variable">Dummy variables</ConceptLink> encode categorical
        information as binary (0/1) indicators. For a variable with <MathBlock tex="k" /> categories,
        include <MathBlock tex="k-1" /> dummies to avoid the <strong>dummy variable trap</strong>{' '}
        (perfect multicollinearity with the intercept).
      </p>
      <p>
        The coefficient on a dummy represents the difference in the expected value of{' '}
        <MathBlock tex="y" /> between that category and the reference (omitted) category.
      </p>

      <DecisionScenario
        scenario="You're building a model to predict house prices. You've started with 5 variables (square footage, bedrooms, lot size, age, location). A colleague suggests adding 15 more variables (pool, garage type, school district ranking, etc.) because 'more data is always better.' Your adjusted R² barely changes. What do you do?"
        choices={[
          { label: "Add all 15 variables for completeness", explanation: "More variables is not always better. Adding irrelevant variables inflates standard errors, increases overfitting risk, and makes interpretation harder — even if R² goes up slightly, adjusted R² and AIC/BIC may worsen.", isRecommended: false },
          { label: "Use AIC/BIC to select the best subset", explanation: "Correct! Information criteria balance fit and complexity. Compare models with and without each variable group. Keep variables that meaningfully improve AIC or BIC. This gives you a principled, defensible model.", isRecommended: true },
          { label: "Use stepwise regression to decide automatically", explanation: "Stepwise regression is convenient but has known problems: it can be unstable (small data changes produce different models), inflates significance levels, and doesn't account for subject-matter knowledge. Use it as a starting point, not as a final answer.", isRecommended: false },
        ]}
      />

      <KeyTakeaways items={[
        "The OLS estimator minimizes squared residuals and is BLUE under the Gauss-Markov assumptions — but violations like heteroscedasticity require robust standard errors.",
        "R² always increases with more variables; use adjusted R², AIC, or BIC to compare models of different sizes.",
        "Multicollinearity inflates standard errors without biasing estimates — detect with VIF and address by removing or combining correlated variables.",
        "Log and polynomial transformations let you capture nonlinear relationships within the linear regression framework.",
      ]} />

      <h2>Code Example</h2>
      <CodeBlock python={codeExamples.ch2.python} r={codeExamples.ch2.r} title={codeExamples.ch2.title} />

      <QuizSection chapterId="ch2" />
    </ChapterLayout>
  )
}
