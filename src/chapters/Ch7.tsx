import { ChapterLayout } from '../components/content/ChapterLayout'
import { ConceptLink } from '../components/tooltip/ConceptLink'
import { MathBlock } from '../components/content/MathBlock'
import { ExpandableReading } from '../components/content/ExpandableReading'
import { KeyTakeaways } from '../components/content/KeyTakeaways'
import { DecisionScenario } from '../components/content/DecisionScenario'
import { QuizSection } from '../components/content/QuizSection'

export default function Ch7() {
  return (
    <ChapterLayout title="Chapter 7: Discrete Choice Models" subtitle="Multinomial logit, IIA, nested logit, and mixed logit for multi-category decisions">

      {/* === Learning Objectives === */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg">
        <h3 className="font-semibold text-blue-800 dark:text-blue-200">Learning Objectives</h3>
        <ul className="list-disc list-inside text-sm text-blue-700 dark:text-blue-300 mt-2 space-y-1">
          <li>Understand when to use discrete choice models versus binary or ordered response models</li>
          <li>Formulate and interpret the <ConceptLink conceptId="multinomial-logit">multinomial logit (MNL)</ConceptLink> model</li>
          <li>Explain the <ConceptLink conceptId="iia">Independence of Irrelevant Alternatives (IIA)</ConceptLink> property and its implications</li>
          <li>Apply <ConceptLink conceptId="nested-logit">nested logit</ConceptLink> and <ConceptLink conceptId="mixed-logit">mixed logit</ConceptLink> models to relax IIA</li>
          <li>Compute and interpret <ConceptLink conceptId="marginal-effects">marginal effects</ConceptLink> and choice probabilities</li>
        </ul>
      </div>

      {/* === Section 1: When the Response Has Multiple Categories === */}
      <h2>When the Response Has Multiple Categories</h2>
      <p>
        In earlier chapters, we modeled binary outcomes (yes/no) using logistic and probit regression. But many real-world
        decisions involve choosing among <strong>three or more unordered</strong> alternatives. Which mode of transportation
        does a commuter choose (car, bus, train, bicycle)? Which brand does a consumer purchase? Which city does a firm
        locate in?
      </p>
      <p>
        These problems require <strong>discrete choice models</strong> — extensions of binary choice that handle multiple
        unordered alternatives. The theoretical foundation is the{' '}
        <ConceptLink conceptId="random-utility-model">random utility model (RUM)</ConceptLink>: a decision-maker chooses
        the alternative that provides the highest utility.
      </p>

      {/* === Section 2: Random Utility and Multinomial Logit === */}
      <h2>Random Utility and the Multinomial Logit</h2>
      <p>
        In the RUM framework, the <ConceptLink conceptId="utility-function">utility</ConceptLink> that individual{' '}
        <MathBlock tex="i" /> derives from alternative <MathBlock tex="j" /> has a systematic component and a
        random component:
      </p>
      <MathBlock tex="U_{ij} = V_{ij} + \epsilon_{ij}" display />
      <p>
        where <MathBlock tex="V_{ij} = X_{ij}\beta" /> is the observable part (a linear function of alternative
        and individual characteristics) and <MathBlock tex="\epsilon_{ij}" /> is the random, unobserved part.
      </p>
      <p>
        The <ConceptLink conceptId="multinomial-logit">multinomial logit (MNL)</ConceptLink> model assumes that the
        error terms <MathBlock tex="\epsilon_{ij}" /> are independently and identically distributed according to a
        Type I extreme value (Gumbel) distribution. Under this assumption, the{' '}
        <ConceptLink conceptId="choice-probability">choice probability</ConceptLink> has a closed-form expression:
      </p>
      <MathBlock tex="P(i \mid J) = \frac{e^{V_i}}{\sum_{j=1}^{J} e^{V_j}}" display />
      <p>
        This is the familiar softmax function. Estimation is done by{' '}
        <ConceptLink conceptId="mle">maximum likelihood</ConceptLink>. The log-likelihood sums over individuals
        and alternatives, and the resulting estimates give the effect of each attribute on the probability of choosing
        each alternative.
      </p>

      {/* === Section 3: IIA Property === */}
      <h2>Independence of Irrelevant Alternatives</h2>
      <p>
        The MNL model implies a strong property called{' '}
        <ConceptLink conceptId="iia">Independence of Irrelevant Alternatives (IIA)</ConceptLink>: the ratio of
        choice probabilities between any two alternatives depends only on the attributes of those two alternatives,
        not on any other alternative in the choice set:
      </p>
      <MathBlock tex="\frac{P(i)}{P(j)} = \frac{e^{V_i}}{e^{V_j}} \quad \text{independent of other alternatives}" display />
      <p>
        This means that adding or removing an alternative affects all remaining alternatives proportionally — the
        famous "red bus / blue bus" problem. If commuters split 50-50 between car and red bus, adding an identical
        blue bus should only steal riders from the red bus. But MNL predicts the blue bus draws equally from car
        and red bus, giving car 1/3 and each bus 1/3, which is unrealistic.
      </p>
      <p>
        The <ConceptLink conceptId="hausman-test">Hausman-McFadden test</ConceptLink> can detect IIA violations:
        estimate the MNL on the full choice set, then re-estimate after dropping one alternative. If the coefficients
        change significantly, IIA is violated.
      </p>

      {/* === Section 4: Nested Logit === */}
      <h2>Nested Logit</h2>
      <p>
        The <ConceptLink conceptId="nested-logit">nested logit</ConceptLink> model relaxes IIA by grouping similar
        alternatives into <strong>nests</strong>. Alternatives within the same nest can be correlated (share unobserved
        attributes), while alternatives in different nests remain independent.
      </p>
      <p>
        In the transportation example, you might nest "red bus" and "blue bus" together under "public transit," while
        "car" and "bicycle" form a "private" nest. Within the public transit nest, the IIA property still holds, but
        across nests it does not. Adding a blue bus primarily cannibalizes the red bus (same nest), with minimal impact
        on car or bicycle choice probabilities.
      </p>
      <p>
        The nested logit introduces a <strong>dissimilarity parameter</strong> <MathBlock tex="\sigma_k" /> for each
        nest <MathBlock tex="k" />, which captures the degree of correlation among alternatives within the nest.
        When <MathBlock tex="\sigma_k = 1" /> for all nests, the model collapses back to MNL.
      </p>

      <ExpandableReading title="Deep Dive: Mixed Logit — The Most Flexible Model">
        <p>
          The <ConceptLink conceptId="mixed-logit">mixed logit</ConceptLink> (also called random coefficients logit)
          is the most flexible discrete choice model in common use. It relaxes IIA completely by allowing the coefficients
          <MathBlock tex="\beta" /> to vary randomly across individuals:
        </p>
        <MathBlock tex="\beta_i \sim \text{Normal}(\mu, \Sigma)" display />
        <p>
          Each individual has their own set of preferences drawn from a population distribution. The choice probability
          for individual <MathBlock tex="i" /> is:
        </p>
        <MathBlock tex="P(j \mid X_i) = \int \frac{e^{X_{ij}\beta}}{\sum_k e^{X_{ik}\beta}} f(\beta \mid \mu, \Sigma)\, d\beta" display />
        <p>
          This integral has no closed form, so estimation uses <strong>simulated maximum likelihood</strong> — drawing
          many random values of <MathBlock tex="\beta" /> and averaging the logit probabilities.
          The mixed logit can approximate any random utility model and allows for rich substitution patterns.
          The downside is computational cost and the need to specify the mixing distribution.
        </p>
      </ExpandableReading>

      {/* === Section 5: Interpreting Discrete Choice Results === */}
      <h2>Interpretation: Marginal Effects and Willingness to Pay</h2>
      <p>
        In MNL, coefficients do not have a direct marginal effect interpretation because the choice probabilities
        are nonlinear. <ConceptLink conceptId="marginal-effects">Marginal effects</ConceptLink> — the change in
        choice probability from a one-unit change in a covariate — must be computed as:
      </p>
      <MathBlock tex="\frac{\partial P_j}{\partial X_k} = P_j(\beta_k - \bar{\beta}_k)" display />
      <p>
        where <MathBlock tex="\bar{{\beta}}_k = \sum_j P_j \beta_k^{(j)}" /> is the probability-weighted average
        effect. Note that a positive coefficient for alternative <MathBlock tex="j" /> increases that alternative's
        probability but decreases the probability of all other alternatives.
      </p>
      <p>
        A common application is computing <strong>willingness to pay (WTP)</strong> — how much of one attribute a
        decision-maker would trade for a unit of another. If <MathBlock tex="\beta_{\text{time}}" /> and{' '}
        <MathBlock tex="\beta_{\text{cost}}" /> are both in the model, the value of time is{' '}
        <MathBlock tex="-\beta_{\text{time}} / \beta_{\text{cost}}" />.
      </p>

      {/* === Decision Scenario === */}
      <DecisionScenario
        scenario="A city transportation authority wants to predict commuter mode choice (car, bus, light rail, bicycle) to forecast ridership for a proposed new light rail line. Preliminary analysis shows that bus and light rail share many attributes (fixed routes, schedules, stops). Which model should they use?"
        choices={[
          {
            label: "Multinomial Logit (MNL)",
            explanation: "MNL is computationally simple but its IIA property means it will predict that the new light rail line draws riders proportionally from all modes. Since light rail and bus share many features, most new rail riders would realistically come from bus, not car. MNL would overestimate the reduction in car usage and underestimate bus cannibalization.",
            isRecommended: false,
          },
          {
            label: "Nested Logit with a 'public transit' nest",
            explanation: "This is the best practical choice. Nesting bus and light rail together under 'public transit' allows them to be close substitutes, reflecting their shared characteristics. The model correctly predicts that light rail primarily cannibalizes bus ridership with a smaller effect on car and bicycle. The dissimilarity parameter quantifies within-nest substitution.",
            isRecommended: true,
          },
          {
            label: "Mixed Logit",
            explanation: "Mixed logit is the most flexible model and would capture heterogeneous preferences across commuters. However, it is computationally intensive, requires specifying mixing distributions, and may be overkill for this policy question where the main concern is the substitution pattern between transit modes. Nested logit is simpler and directly addresses the IIA problem here.",
            isRecommended: false,
          },
        ]}
      />

      {/* === Key Takeaways === */}
      <KeyTakeaways items={[
        "Multinomial logit extends binary choice to multiple unordered alternatives using the softmax probability — but beware of the IIA assumption.",
        "The IIA property implies proportional substitution across all alternatives, which is unrealistic when some alternatives are close substitutes.",
        "Nested logit groups similar alternatives into nests, allowing within-nest correlation and more realistic substitution patterns.",
        "Mixed logit is the most flexible alternative, allowing taste heterogeneity and arbitrary substitution, at the cost of computational complexity.",
      ]} />

      {/* === Quiz === */}
      <QuizSection chapterId="ch7" />
    </ChapterLayout>
  )
}
