import { ChapterLayout } from '../components/content/ChapterLayout'
import { ConceptLink } from '../components/tooltip/ConceptLink'
import { MathBlock } from '../components/content/MathBlock'
import { ExpandableReading } from '../components/content/ExpandableReading'
import { KeyTakeaways } from '../components/content/KeyTakeaways'
import { DecisionScenario } from '../components/content/DecisionScenario'
import { QuizSection } from '../components/content/QuizSection'

export default function Ch8() {
  return (
    <ChapterLayout title="Chapter 8: Instrumental Variables" subtitle="Addressing endogeneity with 2SLS, instrument strength, and the Hausman test">

      {/* === Learning Objectives === */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg">
        <h3 className="font-semibold text-blue-800 dark:text-blue-200">Learning Objectives</h3>
        <ul className="list-disc list-inside text-sm text-blue-700 dark:text-blue-300 mt-2 space-y-1">
          <li>Identify the sources of <ConceptLink conceptId="endogeneity">endogeneity</ConceptLink> and why they invalidate OLS</li>
          <li>Understand what makes a valid <ConceptLink conceptId="instrumental-variable">instrumental variable</ConceptLink>: relevance and exclusion restriction</li>
          <li>Apply <ConceptLink conceptId="two-stage-least-squares">Two-Stage Least Squares (2SLS)</ConceptLink> estimation</li>
          <li>Test for endogeneity using the <ConceptLink conceptId="hausman-test">Hausman test</ConceptLink></li>
          <li>Diagnose <ConceptLink conceptId="weak-instruments">weak instruments</ConceptLink> and understand over-identification tests</li>
        </ul>
      </div>

      {/* === Section 1: What is Endogeneity? === */}
      <h2>What is Endogeneity?</h2>
      <p>
        In a standard regression model <MathBlock tex="Y = X\beta + \epsilon" />, the key identifying assumption is
        that the error term <MathBlock tex="\epsilon" /> is uncorrelated with the regressors <MathBlock tex="X" />.
        When this assumption is violated — that is, when <MathBlock tex="\text{Cov}(X, \epsilon) \neq 0" /> — we say
        the regressor is <ConceptLink conceptId="endogeneity">endogenous</ConceptLink>, and{' '}
        <ConceptLink conceptId="ols">OLS</ConceptLink> estimates become <strong>biased and inconsistent</strong>.
      </p>
      <p>
        Endogeneity can arise from three main sources:
      </p>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li>
          <strong><ConceptLink conceptId="omitted-variable-bias">Omitted variable bias</ConceptLink>:</strong> A variable
          that affects both <MathBlock tex="Y" /> and <MathBlock tex="X" /> is left out of the model. The effect of
          the omitted variable is absorbed into <MathBlock tex="\epsilon" />, which then correlates with{' '}
          <MathBlock tex="X" />. Example: ability affects both education and earnings, so regressing earnings on
          education without controlling for ability produces a biased estimate.
        </li>
        <li>
          <strong>Measurement error:</strong> If <MathBlock tex="X" /> is measured with error, the observed
          variable <MathBlock tex="X^* = X + u" /> is correlated with the composite error, biasing OLS toward zero
          (attenuation bias).
        </li>
        <li>
          <strong>Simultaneity:</strong> <MathBlock tex="X" /> and <MathBlock tex="Y" /> are jointly determined.
          In supply and demand, price affects quantity and quantity affects price — regressing one on the other
          with OLS estimates neither the supply nor the demand curve.
        </li>
      </ul>

      {/* === Section 2: The Instrumental Variable Solution === */}
      <h2>The Instrumental Variable Solution</h2>
      <p>
        An <ConceptLink conceptId="instrumental-variable">instrumental variable (IV)</ConceptLink>{' '}
        <MathBlock tex="Z" /> is a variable that satisfies two conditions:
      </p>
      <ol className="list-decimal list-inside space-y-2 ml-4">
        <li>
          <strong>Relevance:</strong> <MathBlock tex="Z" /> is correlated with the endogenous regressor{' '}
          <MathBlock tex="X" />. Formally, <MathBlock tex="\text{Cov}(Z, X) \neq 0" />.
        </li>
        <li>
          <strong><ConceptLink conceptId="exclusion-restriction">Exclusion restriction</ConceptLink>:</strong>{' '}
          <MathBlock tex="Z" /> affects <MathBlock tex="Y" /> <em>only through</em> <MathBlock tex="X" />.
          Formally, <MathBlock tex="\text{Cov}(Z, \epsilon) = 0" />.
        </li>
      </ol>
      <p>
        The intuition is that <MathBlock tex="Z" /> provides exogenous variation in <MathBlock tex="X" />. By
        isolating this exogenous portion of <MathBlock tex="X" />'s variation and using only that portion to
        estimate the effect on <MathBlock tex="Y" />, we purge the endogeneity.
      </p>
      <p>
        The simple IV estimator with one instrument and one endogenous variable is:
      </p>
      <MathBlock tex="\hat{\beta}_{IV} = \frac{\text{Cov}(Z, Y)}{\text{Cov}(Z, X)} = (Z'X)^{-1}Z'Y" display />

      {/* === Section 3: Two-Stage Least Squares === */}
      <h2>Two-Stage Least Squares (2SLS)</h2>
      <p>
        <ConceptLink conceptId="two-stage-least-squares">Two-Stage Least Squares</ConceptLink> is the practical
        estimation procedure for IV models, especially when there are multiple instruments or additional exogenous
        covariates. It proceeds in two stages:
      </p>
      <h3>First Stage</h3>
      <p>
        Regress the endogenous variable <MathBlock tex="X" /> on the instruments <MathBlock tex="Z" /> and any
        exogenous covariates <MathBlock tex="W" /> using OLS:
      </p>
      <MathBlock tex="X = Z\pi + W\gamma + v" display />
      <p>
        Save the predicted values <MathBlock tex="\hat{X}" /> from this regression. These predicted values capture
        only the variation in <MathBlock tex="X" /> that is driven by the instruments — the exogenous portion.
      </p>
      <h3>Second Stage</h3>
      <p>
        Replace <MathBlock tex="X" /> with <MathBlock tex="\hat{X}" /> in the original equation and estimate by OLS:
      </p>
      <MathBlock tex="Y = \hat{X}\beta + W\delta + u" display />
      <p>
        The resulting <MathBlock tex="\hat{\beta}" /> is the 2SLS estimator. It is{' '}
        <ConceptLink conceptId="consistency">consistent</ConceptLink> when the instruments are valid, even though
        OLS is not. Note that standard errors from the second-stage OLS are incorrect; software packages compute
        the correct 2SLS standard errors automatically.
      </p>

      {/* === Section 4: Testing for Endogeneity === */}
      <h2>Testing for Endogeneity: The Hausman Test</h2>
      <p>
        Before going through the trouble of IV estimation, we should test whether endogeneity is actually a problem.
        The <ConceptLink conceptId="hausman-test">Hausman test</ConceptLink> compares OLS and 2SLS estimates:
      </p>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li><strong>Null hypothesis:</strong> <MathBlock tex="X" /> is exogenous (OLS is consistent and efficient).</li>
        <li><strong>Alternative:</strong> <MathBlock tex="X" /> is endogenous (OLS is inconsistent; 2SLS is consistent).</li>
      </ul>
      <p>
        Under the null, both OLS and 2SLS are consistent, but OLS is more efficient. If the estimates differ significantly,
        we reject the null and conclude that endogeneity is present, justifying the use of IV. The test statistic follows
        a chi-squared distribution.
      </p>

      {/* === Section 5: Instrument Quality === */}
      <h2>Instrument Quality</h2>
      <p>
        Not all instruments are equally good. Two critical diagnostics:
      </p>
      <h3>Weak Instruments</h3>
      <p>
        <ConceptLink conceptId="weak-instruments">Weak instruments</ConceptLink> are only weakly correlated with the
        endogenous regressor. They cause several problems: the 2SLS estimator becomes severely biased (toward OLS),
        confidence intervals have incorrect coverage, and hypothesis tests have distorted size.
      </p>
      <p>
        The standard diagnostic is the <ConceptLink conceptId="first-stage">first-stage F-statistic</ConceptLink> from
        the regression of <MathBlock tex="X" /> on <MathBlock tex="Z" />. The rule of thumb by Staiger and Stock (1997)
        is that <MathBlock tex="F > 10" /> indicates instruments are not weak. Below 10, weak instrument corrections
        (Anderson-Rubin confidence sets, LIML estimation) should be considered.
      </p>

      <h3>Over-Identification</h3>
      <p>
        When you have more instruments than endogenous regressors, the model is <strong>over-identified</strong>. This
        allows you to test whether the instruments are valid using the{' '}
        <ConceptLink conceptId="sargan-test">Sargan test</ConceptLink> (or Hansen's J-test in the GMM framework).
        Under the null that all instruments are valid, the test statistic follows a chi-squared distribution with degrees
        of freedom equal to the number of over-identifying restrictions.
      </p>
      <p>
        A rejection suggests that at least one instrument violates the exclusion restriction. However, the Sargan test
        has limited power — it only detects violations in the over-identifying instruments relative to the just-identified
        ones, not absolute violations.
      </p>

      <ExpandableReading title="Deep Dive: Finding Good Instruments in Practice">
        <p>
          Finding valid instruments is the hardest part of IV analysis. Good instruments come from:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li><strong>Natural experiments:</strong> Policy changes, weather shocks, or geographic boundaries that affect the endogenous variable but not the outcome directly.</li>
          <li><strong>Institutional features:</strong> Draft lotteries (for the effect of military service), compulsory schooling laws (for the effect of education), distance to college (for the effect of education).</li>
          <li><strong>Lagged variables:</strong> Past values of the endogenous variable can serve as instruments if the error is not serially correlated.</li>
        </ul>
        <p>
          The exclusion restriction is fundamentally untestable in the just-identified case — it requires economic reasoning,
          not statistical tests. The strongest IV papers tell a convincing story about <em>why</em> the instrument only
          affects the outcome through the endogenous variable.
        </p>
      </ExpandableReading>

      {/* === Decision Scenario === */}
      <DecisionScenario
        scenario="You want to estimate the effect of education (years of schooling) on earnings. You suspect that ability is an omitted variable — smarter people tend to get more education AND earn more, biasing the OLS estimate upward. A colleague suggests using 'quarter of birth' as an instrument, since compulsory schooling laws mean people born earlier in the year tend to get slightly less education. What do you do?"
        choices={[
          {
            label: "Use OLS anyway and acknowledge the bias",
            explanation: "OLS will overestimate the return to education because ability is positively correlated with both education and earnings. While transparent about the limitation, this does not address the fundamental identification problem.",
            isRecommended: false,
          },
          {
            label: "Use quarter of birth as an instrument with 2SLS, but check instrument strength",
            explanation: "This is the right approach with the right caveat. Quarter of birth satisfies the exclusion restriction (it affects earnings only through education) and is relevant (compulsory schooling laws create education differences by quarter). However, the instrument is known to be weak — the first-stage F-statistic is often below 10. You should report the first-stage F, use weak-instrument-robust inference (e.g., Anderson-Rubin confidence sets), and consider LIML estimation as a less biased alternative to 2SLS.",
            isRecommended: true,
          },
          {
            label: "Use parents' education as an instrument",
            explanation: "Parents' education is strongly correlated with the child's education (relevance is satisfied). However, parents' education likely has a direct effect on earnings through connections, attitudes toward work, or inherited human capital. The exclusion restriction is very questionable, making this a poor instrument despite its relevance.",
            isRecommended: false,
          },
        ]}
      />

      {/* === Key Takeaways === */}
      <KeyTakeaways items={[
        "Endogeneity (from omitted variables, measurement error, or simultaneity) biases OLS — recognizing it is the first step toward a credible causal estimate.",
        "A valid instrument must satisfy both relevance (correlated with X) and the exclusion restriction (uncorrelated with the error) — relevance is testable, exclusion generally is not.",
        "2SLS isolates the exogenous variation in X by first predicting X from the instruments, then regressing Y on the prediction — always check the first-stage F-statistic for weak instruments.",
        "The Hausman test determines whether endogeneity is large enough to warrant IV over OLS; the Sargan test checks instrument validity when over-identified.",
      ]} />

      {/* === Quiz === */}
      <QuizSection chapterId="ch8" />
    </ChapterLayout>
  )
}
