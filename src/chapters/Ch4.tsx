import { ChapterLayout } from '../components/content/ChapterLayout'
import { ConceptLink } from '../components/tooltip/ConceptLink'
import { MathBlock } from '../components/content/MathBlock'
import { ExpandableReading } from '../components/content/ExpandableReading'
import { KeyTakeaways } from '../components/content/KeyTakeaways'
import { DecisionScenario } from '../components/content/DecisionScenario'
import { QuizSection } from '../components/content/QuizSection'
import { CodeBlock } from '../components/content/CodeBlock'
import { codeExamples } from '../data/codeExamples'
import { CensoringVisualizer } from '../components/widgets/CensoringVisualizer'

export default function Ch4() {
  return (
    <ChapterLayout title="Chapter 4: Censored Data & the Tobit Model" subtitle="Modeling partially observed responses">
      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg">
        <h3 className="font-semibold text-blue-800 dark:text-blue-200">Learning Objectives</h3>
        <ul className="list-disc list-inside text-sm text-blue-700 dark:text-blue-300 mt-2 space-y-1">
          <li>Distinguish between censoring and truncation</li>
          <li>Explain why OLS is biased and inconsistent with censored data</li>
          <li>Formulate the Tobit model and its likelihood function</li>
          <li>Interpret Tobit coefficients using marginal effects</li>
          <li>Identify real-world applications of censored regression</li>
        </ul>
      </div>

      <h2>What Is Censoring?</h2>
      <p>
        <ConceptLink conceptId="censoring">Censoring</ConceptLink> occurs when the value of the
        dependent variable is only partially observed for some observations. The key feature is
        that we <em>know</em> the observation is censored — we just can't see the full value.
      </p>
      <p>
        There are three types of censoring:
      </p>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li><strong>Left censoring:</strong> Values below a threshold are reported as the threshold. Example: a lab test that can't detect concentrations below a certain limit reports "below detection limit."</li>
        <li><strong>Right censoring:</strong> Values above a threshold are reported as the threshold. Example: income surveys that top-code at $200,000 — anyone earning more is recorded as $200,000.</li>
        <li><strong>Interval censoring:</strong> The true value is known only to fall within an interval.</li>
      </ul>

      <h2>Censoring vs. Truncation</h2>
      <p>
        <ConceptLink conceptId="truncation">Truncation</ConceptLink> is a more severe form of data
        limitation. With censoring, we observe that a data point exists and know it is at the boundary.
        With truncation, observations beyond the boundary are <em>entirely missing</em> from the dataset.
      </p>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse max-w-xl">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="text-left p-2">Feature</th>
              <th className="text-left p-2">Censoring</th>
              <th className="text-left p-2">Truncation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr><td className="p-2">Observation exists?</td><td className="p-2">Yes — we see it at the limit</td><td className="p-2">No — it's dropped entirely</td></tr>
            <tr><td className="p-2">Sample size</td><td className="p-2">Full sample retained</td><td className="p-2">Reduced sample</td></tr>
            <tr><td className="p-2">Information loss</td><td className="p-2">Partial — we know the bound</td><td className="p-2">Total — observation vanishes</td></tr>
            <tr><td className="p-2">Appropriate model</td><td className="p-2">Tobit</td><td className="p-2">Truncated regression</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Example: A study of household charitable donations. <strong>Censoring</strong>: everyone is
        surveyed, but many report $0 donations (the true "desire to donate" may be negative, but we
        observe it as 0). <strong>Truncation</strong>: only households that donated are included in
        the study — non-donors aren't in the data at all.
      </p>

      <h2>Why OLS Fails on Censored Data</h2>
      <p>
        When you apply <ConceptLink conceptId="ols">OLS</ConceptLink> to censored data, two problems arise:
      </p>
      <ol className="list-decimal list-inside space-y-2 ml-4">
        <li>
          <strong>Biased coefficients:</strong> The pile-up of observations at the censoring point
          pulls the regression line toward the boundary, attenuating (shrinking) the estimated
          slopes toward zero.
        </li>
        <li>
          <strong>Inconsistency:</strong> Even with infinite data, OLS does not converge to the
          true parameters because the conditional expectation <MathBlock tex="E[y|X]" /> is not
          linear when observations are censored.
        </li>
      </ol>
      <p>
        Intuitively, OLS treats the censored observations as if their true value equals the
        censoring point, which systematically understates the relationship between{' '}
        <MathBlock tex="X" /> and the true (latent) <MathBlock tex="y^*" />.
      </p>

      <h2>The Tobit Model</h2>
      <p>
        The <ConceptLink conceptId="tobit-model">Tobit model</ConceptLink> (Tobin, 1958)
        explicitly accounts for censoring using a{' '}
        <ConceptLink conceptId="latent-variable">latent variable</ConceptLink> framework.
        The underlying (unobserved) variable is:
      </p>
      <MathBlock tex="y_i^* = X_i\beta + \varepsilon_i, \quad \varepsilon_i \sim N(0, \sigma^2)" display />
      <p>
        The observed variable is censored at zero (for left-censoring):
      </p>
      <MathBlock tex="y_i = \begin{cases} y_i^* & \text{if } y_i^* > 0 \\ 0 & \text{if } y_i^* \leq 0 \end{cases}" display />

      <h3>Likelihood Function</h3>
      <p>
        The likelihood has two types of contributions — one from uncensored observations and one
        from censored observations:
      </p>
      <MathBlock tex="\mathcal{L}(\beta, \sigma) = \prod_{y_i > 0} \frac{1}{\sigma}\phi\!\left(\frac{y_i - X_i\beta}{\sigma}\right) \times \prod_{y_i = 0} \Phi\!\left(\frac{-X_i\beta}{\sigma}\right)" display />
      <p>
        where <MathBlock tex="\phi(\cdot)" /> is the standard normal PDF and{' '}
        <MathBlock tex="\Phi(\cdot)" /> is the standard normal CDF. For uncensored observations,
        we use the normal density evaluated at the actual value. For censored observations, we
        use the probability that the latent variable falls below zero.
      </p>
      <p>
        This is estimated by <ConceptLink conceptId="mle">Maximum Likelihood</ConceptLink> — no
        closed-form solution exists, so iterative numerical optimization is required.
      </p>

      <h2>Interpreting Tobit Coefficients</h2>
      <p>
        Unlike OLS, Tobit coefficients do not directly represent{' '}
        <ConceptLink conceptId="marginal-effects">marginal effects</ConceptLink> on the observed
        outcome. There are three quantities of interest:
      </p>
      <ol className="list-decimal list-inside space-y-2 ml-4">
        <li>
          <strong>Effect on latent variable:</strong>{' '}
          <MathBlock tex="\frac{\partial E[y^*]}{\partial x_j} = \beta_j" /> — the raw coefficient.
        </li>
        <li>
          <strong>Effect on observed variable (unconditional):</strong>{' '}
          <MathBlock tex="\frac{\partial E[y]}{\partial x_j} = \beta_j \cdot \Phi\!\left(\frac{X\beta}{\sigma}\right)" /> — scaled by the probability of being uncensored.
        </li>
        <li>
          <strong>Effect on observed variable, conditional on being uncensored:</strong> Also involves the
          inverse Mills ratio and is smaller than the raw coefficient.
        </li>
      </ol>
      <p>
        In practice, always report marginal effects (evaluated at sample means or averaged over
        observations), not raw Tobit coefficients, for business interpretation.
      </p>

      <CensoringVisualizer />

      <ExpandableReading title="Deep Dive: The Inverse Mills Ratio">
        <p>
          The conditional expectation of a censored normal involves the{' '}
          <strong>inverse Mills ratio</strong> (IMR):
        </p>
        <MathBlock tex="\lambda(z) = \frac{\phi(z)}{\Phi(z)}" display />
        <p>
          The IMR captures the selection effect — it corrects for the fact that uncensored
          observations are not a random sample of the population. As <MathBlock tex="z" />{' '}
          increases (making censoring less likely), the IMR shrinks, and the conditional
          expectation approaches the unconditional one.
        </p>
        <p>
          The IMR also appears in Heckman's two-step selection model, which extends the Tobit
          framework to allow different processes for the censoring decision and the outcome.
        </p>
      </ExpandableReading>

      <h2>Applications</h2>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li><strong>Household expenditure:</strong> Many households spend $0 on luxury goods; the Tobit model captures the latent desire to spend that is censored at zero.</li>
        <li><strong>Hours worked:</strong> Many people work 0 hours (non-participants); hours can't be negative.</li>
        <li><strong>Insurance claims:</strong> Most policyholders file $0 in claims; the Tobit handles the mass at zero.</li>
        <li><strong>R&D investment:</strong> Many firms invest $0 in R&D; censoring at zero is appropriate.</li>
      </ul>

      <h2>Limitations of the Tobit Model</h2>
      <p>
        The standard Tobit model has important limitations:
      </p>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li>
          <strong>Single mechanism:</strong> It assumes the same process generates both the
          censoring decision and the magnitude. In reality, the decision to spend and how much
          to spend may involve different factors.
        </li>
        <li>
          <strong>Normality:</strong> The Tobit relies on normally distributed errors.
          Misspecification leads to inconsistent estimates.
        </li>
        <li>
          <strong>Homoscedasticity:</strong> Like OLS under normality, the Tobit assumes
          constant error variance.
        </li>
      </ul>
      <p>
        When the censoring decision and the outcome are driven by different processes, consider
        Heckman's selection model or a two-part (hurdle) model instead.
      </p>

      <DecisionScenario
        scenario="You're analyzing customer spending on a new product line. 40% of customers spent $0, and the rest spent between $5 and $500. You need to understand what drives spending. How do you model this?"
        choices={[
          { label: "Run OLS on the full dataset including zeros", explanation: "OLS will underestimate the effect of predictors because the mass at zero pulls slopes toward zero. The conditional expectation is non-linear due to censoring, so OLS is biased and inconsistent.", isRecommended: false },
          { label: "Drop the zeros and run OLS on spenders only", explanation: "This introduces selection bias — you're conditioning on the outcome (spending > 0). The resulting estimates only apply to the selected subsample and are biased for the population. If factors affecting the decision to spend are correlated with how much to spend, the bias can be severe.", isRecommended: false },
          { label: "Use a Tobit model on the full dataset", explanation: "Correct! The Tobit accounts for the pile-up at zero by modeling a latent spending desire that is censored at zero. It uses all observations and produces consistent estimates. Report marginal effects, not raw coefficients, for interpretation.", isRecommended: true },
        ]}
      />

      <KeyTakeaways items={[
        "Censoring means we observe the variable at a boundary; truncation means observations beyond the boundary are entirely missing from the data.",
        "OLS on censored data produces biased, inconsistent estimates because it ignores the latent variable mechanism — the Tobit model corrects this.",
        "Tobit coefficients represent effects on the latent variable; always compute and report marginal effects for business interpretation.",
        "When the decision to participate and the magnitude are driven by different factors, consider a Heckman selection model or two-part model instead of Tobit.",
      ]} />

      <h2>Code Example</h2>
      <CodeBlock python={codeExamples.ch4.python} r={codeExamples.ch4.r} title={codeExamples.ch4.title} />

      <QuizSection chapterId="ch4" />
    </ChapterLayout>
  )
}
