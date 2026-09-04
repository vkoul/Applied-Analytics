import { ChapterLayout } from '../components/content/ChapterLayout'
import { ConceptLink } from '../components/tooltip/ConceptLink'
import { MathBlock } from '../components/content/MathBlock'
import { ExpandableReading } from '../components/content/ExpandableReading'
import { KeyTakeaways } from '../components/content/KeyTakeaways'
import { DecisionScenario } from '../components/content/DecisionScenario'
import { QuizSection } from '../components/content/QuizSection'

export default function Ch5() {
  return (
    <ChapterLayout title="Chapter 5: Count Data Models" subtitle="Modeling non-negative integer outcomes with Poisson, Negative Binomial, and Zero-Inflated approaches">

      {/* === Learning Objectives === */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg">
        <h3 className="font-semibold text-blue-800 dark:text-blue-200">Learning Objectives</h3>
        <ul className="list-disc list-inside text-sm text-blue-700 dark:text-blue-300 mt-2 space-y-1">
          <li>Recognize when a response variable is count data and why OLS is inappropriate</li>
          <li>Formulate and interpret a <ConceptLink conceptId="poisson-regression">Poisson regression</ConceptLink> model</li>
          <li>Diagnose <ConceptLink conceptId="overdispersion">overdispersion</ConceptLink> and apply the <ConceptLink conceptId="negative-binomial">Negative Binomial</ConceptLink> model</li>
          <li>Understand when to use <ConceptLink conceptId="zero-inflated-model">zero-inflated models</ConceptLink> and how they differ from standard count models</li>
          <li>Compare count models using deviance, AIC, and Vuong tests</li>
        </ul>
      </div>

      {/* === Section 1: What is Count Data? === */}
      <h2>What is Count Data?</h2>
      <p>
        Count data arises whenever the response variable represents the number of times an event occurs in a fixed period
        or region. Examples include the number of customer complaints per month, the number of patents filed by a firm per year,
        or the number of accidents at an intersection per week. These outcomes are <strong>non-negative integers</strong> (0, 1, 2, 3, …)
        and their distributions are typically <strong>right-skewed</strong>, with many small values and a long right tail.
      </p>
      <p>
        Unlike continuous outcomes, count data has several distinctive features that make standard{' '}
        <ConceptLink conceptId="ols">OLS regression</ConceptLink> inappropriate:
      </p>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li><strong>Non-negativity:</strong> Counts cannot be negative, but OLS can predict negative values.</li>
        <li><strong>Discreteness:</strong> Counts are integers; OLS predicts continuous values.</li>
        <li><strong>Heteroscedasticity:</strong> The variance of counts typically increases with the mean, violating the constant variance assumption of OLS.</li>
        <li><strong>Skewness:</strong> Count distributions are often right-skewed, especially when the mean is low.</li>
      </ul>

      {/* === Section 2: The Poisson Regression Model === */}
      <h2>The Poisson Regression Model</h2>
      <p>
        The starting point for count data modeling is the{' '}
        <ConceptLink conceptId="poisson-distribution">Poisson distribution</ConceptLink>. A random variable{' '}
        <MathBlock tex="Y" /> follows a Poisson distribution with parameter{' '}
        <MathBlock tex="\lambda > 0" /> if its probability mass function is:
      </p>
      <MathBlock tex="P(Y = k) = \frac{e^{-\lambda}\lambda^k}{k!}, \quad k = 0, 1, 2, \ldots" display />
      <p>
        A key property of the Poisson distribution is the <strong>equidispersion</strong> assumption: the mean and variance
        are both equal to <MathBlock tex="\lambda" />:
      </p>
      <MathBlock tex="E(Y) = \text{Var}(Y) = \lambda" display />
      <p>
        In <ConceptLink conceptId="poisson-regression">Poisson regression</ConceptLink>, we model the log of the
        conditional mean as a linear function of the predictors:
      </p>
      <MathBlock tex="\ln(\lambda_i) = X_i\beta \quad \Longleftrightarrow \quad \lambda_i = e^{X_i\beta}" display />
      <p>
        This ensures that the predicted mean <MathBlock tex="\lambda_i" /> is always positive. The model is
        estimated via <ConceptLink conceptId="mle">maximum likelihood estimation (MLE)</ConceptLink>.
      </p>

      <h3>Interpreting Coefficients</h3>
      <p>
        Because we use a log link, the coefficients have a multiplicative interpretation. A one-unit increase in{' '}
        <MathBlock tex="X_j" /> multiplies the expected count by <MathBlock tex="e^{\beta_j}" />.
        This quantity is called the <ConceptLink conceptId="incidence-rate-ratio">incidence rate ratio (IRR)</ConceptLink>.
        For example, if <MathBlock tex="\beta_j = 0.15" />, then <MathBlock tex="e^{0.15} \approx 1.16" />,
        meaning a one-unit increase in <MathBlock tex="X_j" /> is associated with a 16% increase in the expected count.
      </p>

      {/* === Section 3: Exposure and Offset === */}
      <h2>Exposure and Offset</h2>
      <p>
        Often, observations are collected over different lengths of time or across different-sized populations. For instance,
        the number of accidents might be observed over different numbers of miles driven. In such cases, we need to account
        for the <ConceptLink conceptId="exposure-offset">exposure</ConceptLink> (the amount of "opportunity" for events to occur).
      </p>
      <p>
        We model the rate rather than the raw count. If <MathBlock tex="t_i" /> is the exposure for observation{' '}
        <MathBlock tex="i" />, we write:
      </p>
      <MathBlock tex="\ln(\lambda_i) = \ln(t_i) + X_i\beta" display />
      <p>
        The term <MathBlock tex="\ln(t_i)" /> is called the <strong>offset</strong> — it enters the linear predictor with
        a fixed coefficient of 1, effectively converting the model from one that predicts counts to one that predicts rates.
      </p>

      {/* === Section 4: Overdispersion === */}
      <h2>Overdispersion</h2>
      <p>
        The Poisson model's equidispersion assumption is often violated in practice. When the observed variance exceeds
        the mean, we say the data exhibit <ConceptLink conceptId="overdispersion">overdispersion</ConceptLink>:
      </p>
      <MathBlock tex="\text{Var}(Y) > E(Y) \implies \text{overdispersion}" display />
      <p>
        Overdispersion can arise from unobserved heterogeneity — if individuals differ in their underlying propensity to
        experience the event, the aggregate distribution will have more variance than a simple Poisson would predict.
      </p>
      <p>
        A quick diagnostic is to compare the <ConceptLink conceptId="deviance">deviance</ConceptLink> (or Pearson chi-squared
        statistic) to the residual degrees of freedom. If the ratio is substantially greater than 1, overdispersion is likely
        present. A formal test is the Cameron-Trivedi test, which regresses <MathBlock tex="(Y_i - \hat{\lambda}_i)^2 - Y_i" />{' '}
        on <MathBlock tex="\hat{\lambda}_i" /> and tests whether the slope is significantly different from zero.
      </p>

      <ExpandableReading title="Deep Dive: Why Ignoring Overdispersion is Dangerous">
        <p>
          When overdispersion is present but ignored, the Poisson model produces standard errors that are <strong>too small</strong>.
          This leads to confidence intervals that are too narrow and p-values that are too small, inflating the rate
          of false positives. The coefficient estimates themselves remain consistent, but inference becomes unreliable.
        </p>
        <p>
          Think of it this way: the Poisson model assumes that all the variation in the data comes from Poisson randomness.
          When there is extra variation (overdispersion), the model attributes that extra variation to the signal rather
          than to noise, making effects appear more statistically significant than they truly are.
        </p>
      </ExpandableReading>

      {/* === Section 5: The Negative Binomial Model === */}
      <h2>The Negative Binomial Model</h2>
      <p>
        The <ConceptLink conceptId="negative-binomial">Negative Binomial (NB)</ConceptLink> model generalizes the Poisson
        by introducing an additional{' '}
        <ConceptLink conceptId="dispersion-parameter">dispersion parameter</ConceptLink> <MathBlock tex="\alpha" />{' '}
        that allows the variance to exceed the mean:
      </p>
      <MathBlock tex="\text{Var}(Y) = \lambda + \alpha\lambda^2" display />
      <p>
        When <MathBlock tex="\alpha = 0" />, the NB reduces to the Poisson. When <MathBlock tex="\alpha > 0" />,
        the variance grows faster than the mean, accommodating overdispersion. The NB model can be derived by assuming
        that each individual's Poisson rate <MathBlock tex="\lambda_i" /> is itself drawn from a Gamma distribution,
        creating a Poisson-Gamma mixture.
      </p>
      <p>
        Coefficient interpretation in the NB model is the same as in the Poisson: exponentiated coefficients are
        incidence rate ratios. The key difference is that the standard errors are now correct, reflecting the extra
        variance in the data. You can test whether the NB significantly improves on the Poisson by testing{' '}
        <MathBlock tex="H_0: \alpha = 0" /> via a likelihood ratio test (noting that the test statistic has a
        non-standard distribution since <MathBlock tex="\alpha" /> is on the boundary of its parameter space).
      </p>

      {/* === Section 6: Zero-Inflated Models === */}
      <h2>Zero-Inflated Models</h2>
      <p>
        Sometimes count data have more zeros than either the Poisson or Negative Binomial would predict. This "excess zeros"
        phenomenon often arises when the zeros come from two distinct processes. For example, the number of fish caught by
        visitors to a park: some visitors did not go fishing at all (structural zeros), while others went fishing but caught
        nothing (sampling zeros).
      </p>
      <p>
        <ConceptLink conceptId="zero-inflated-model">Zero-inflated models</ConceptLink> handle this by combining two components:
      </p>
      <ol className="list-decimal list-inside space-y-1 ml-4">
        <li>A <strong>binary model</strong> (typically logistic) that predicts whether an observation is a structural zero.</li>
        <li>A <strong>count model</strong> (Poisson or NB) that predicts the count for non-structural-zero observations.</li>
      </ol>
      <p>
        The <strong>Zero-Inflated Poisson (ZIP)</strong> model combines a logit for the inflation part with a Poisson for the
        count part. The <strong>Zero-Inflated Negative Binomial (ZINB)</strong> replaces the Poisson with a Negative Binomial
        to handle both excess zeros and overdispersion simultaneously.
      </p>
      <p>
        To test whether zero inflation is necessary, the <strong>Vuong test</strong> compares the zero-inflated model against
        its non-inflated counterpart. A significant positive Vuong statistic favors the zero-inflated version.
      </p>

      {/* === Decision Scenario === */}
      <DecisionScenario
        scenario="You are analyzing the number of customer complaints received per month across 500 retail stores. The sample mean is 2.1 complaints per month but the variance is 8.7. Additionally, about 40% of store-months have zero complaints. Which model should you use?"
        choices={[
          {
            label: "Poisson Regression",
            explanation: "The Poisson model requires equidispersion (mean ≈ variance), but here the variance (8.7) is more than four times the mean (2.1). Using Poisson would produce artificially small standard errors and inflated significance.",
            isRecommended: false,
          },
          {
            label: "Negative Binomial Regression",
            explanation: "The NB model handles the overdispersion, but with 40% zeros (much higher than the Poisson or NB would predict given a mean of 2.1), you may also need to account for excess zeros. A Vuong test would help confirm.",
            isRecommended: false,
          },
          {
            label: "Zero-Inflated Negative Binomial (ZINB)",
            explanation: "This is the best starting point. You have both overdispersion (variance >> mean) and excess zeros (40%). ZINB handles both: the NB part accommodates overdispersion, while the zero-inflation component captures the excess zeros from stores that simply do not generate complaints. Confirm with a Vuong test and compare AIC/BIC.",
            isRecommended: true,
          },
        ]}
      />

      {/* === Key Takeaways === */}
      <KeyTakeaways items={[
        "Always check for overdispersion before trusting Poisson regression — compare the deviance to the degrees of freedom, or use a formal test.",
        "The Negative Binomial model adds a dispersion parameter that lets variance exceed the mean, correcting standard errors when overdispersion is present.",
        "Zero-inflated models are appropriate when excess zeros arise from a separate process; the Vuong test helps decide if inflation is needed.",
        "Exponentiated coefficients in both Poisson and NB models are incidence rate ratios, giving a multiplicative interpretation.",
      ]} />

      {/* === Quiz === */}
      <QuizSection chapterId="ch5" />
    </ChapterLayout>
  )
}
