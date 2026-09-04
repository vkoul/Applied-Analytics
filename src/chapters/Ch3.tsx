import { ChapterLayout } from '../components/content/ChapterLayout'
import { ConceptLink } from '../components/tooltip/ConceptLink'
import { MathBlock } from '../components/content/MathBlock'
import { ExpandableReading } from '../components/content/ExpandableReading'
import { KeyTakeaways } from '../components/content/KeyTakeaways'
import { DecisionScenario } from '../components/content/DecisionScenario'
import { QuizSection } from '../components/content/QuizSection'

export default function Ch3() {
  return (
    <ChapterLayout title="Chapter 3: Binary Response Models" subtitle="Modeling yes/no outcomes with logistic and probit regression">
      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg">
        <h3 className="font-semibold text-blue-800 dark:text-blue-200">Learning Objectives</h3>
        <ul className="list-disc list-inside text-sm text-blue-700 dark:text-blue-300 mt-2 space-y-1">
          <li>Explain why OLS fails for binary dependent variables</li>
          <li>Formulate and interpret logistic and probit regression models</li>
          <li>Estimate binary response models using Maximum Likelihood</li>
          <li>Evaluate model performance using confusion matrices, ROC curves, and AUC</li>
          <li>Choose between logit and probit based on context</li>
        </ul>
      </div>

      <h2>The Problem with the Linear Probability Model</h2>
      <p>
        When the dependent variable is binary — for example, whether a customer churns (1) or
        stays (0) — using <ConceptLink conceptId="ols">OLS</ConceptLink> to estimate a "Linear
        Probability Model" (LPM) creates several problems:
      </p>
      <MathBlock tex="P(y = 1 \mid X) = X\beta" display />
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li><strong>Unbounded predictions:</strong> The LPM can predict probabilities less than 0 or greater than 1, which are nonsensical.</li>
        <li><strong>Heteroscedasticity:</strong> The variance of a Bernoulli random variable is <MathBlock tex="p(1-p)" />, which depends on <MathBlock tex="X" /> — violating the constant variance assumption.</li>
        <li><strong>Non-normal errors:</strong> Errors follow a Bernoulli distribution, not a normal distribution.</li>
      </ul>
      <p>
        Despite these issues, the LPM is sometimes used for its simplicity and ease of interpretation
        (coefficients are marginal effects on probability). For rigorous work, however, we need
        models that constrain predictions to [0, 1].
      </p>

      <h2>Logistic Regression</h2>
      <p>
        <ConceptLink conceptId="logistic-regression">Logistic regression</ConceptLink> models the
        probability of the event using the <ConceptLink conceptId="sigmoid-function">logistic (sigmoid) function</ConceptLink>:
      </p>
      <MathBlock tex="P(Y = 1 \mid X) = \frac{1}{1 + e^{-X\beta}} = \Lambda(X\beta)" display />
      <p>
        This S-shaped curve maps any real-valued input to the (0, 1) interval, solving the
        unbounded prediction problem.
      </p>
      <p>
        An equivalent way to express the model is through the{' '}
        <ConceptLink conceptId="log-odds">log-odds (logit)</ConceptLink>:
      </p>
      <MathBlock tex="\ln\left(\frac{p}{1-p}\right) = X\beta" display />
      <p>
        The quantity <MathBlock tex="p/(1-p)" /> is the <strong>odds</strong> of the event occurring.
        Taking the exponential of a coefficient gives the{' '}
        <ConceptLink conceptId="odds-ratio">odds ratio</ConceptLink>:{' '}
        <MathBlock tex="e^{\beta_j}" /> is the factor by which the odds of <MathBlock tex="Y=1" />{' '}
        change for a one-unit increase in <MathBlock tex="x_j" />.
      </p>

      <ExpandableReading title="Deep Dive: Interpreting Odds Ratios">
        <p>
          Suppose <MathBlock tex="\beta_1 = 0.5" /> for variable "years of education." Then the
          odds ratio is <MathBlock tex="e^{0.5} \approx 1.65" />, meaning each additional year of
          education multiplies the odds of the event by 1.65 (a 65% increase in odds).
        </p>
        <p>
          Be careful: odds ratios are <em>not</em> the same as probability ratios. An odds ratio
          of 2 means the odds double, but the effect on probability depends on the baseline
          probability. When the event is rare (base rate &lt; 10%), odds ratios approximate relative
          risk. For common events, they can be misleading.
        </p>
        <p>
          For a more intuitive measure, compute <strong>marginal effects</strong>: the change in
          predicted probability for a one-unit change in <MathBlock tex="x_j" />, evaluated at
          the sample means or averaged over all observations.
        </p>
      </ExpandableReading>

      <h2>The Probit Model</h2>
      <p>
        The <ConceptLink conceptId="probit-model">probit model</ConceptLink> is an alternative to
        logistic regression that uses the standard normal CDF as the{' '}
        <ConceptLink conceptId="link-function">link function</ConceptLink>:
      </p>
      <MathBlock tex="P(Y = 1 \mid X) = \Phi(X\beta)" display />
      <p>
        where <MathBlock tex="\Phi(\cdot)" /> is the cumulative distribution function of the
        standard normal distribution. Like the logistic CDF, the normal CDF maps any input to (0, 1),
        producing an S-shaped curve.
      </p>
      <p>
        The probit model arises naturally from a latent variable framework: suppose there's an
        unobserved continuous variable <MathBlock tex="y^* = X\beta + \varepsilon" /> with{' '}
        <MathBlock tex="\varepsilon \sim N(0,1)" />, and we observe <MathBlock tex="y = 1" /> when{' '}
        <MathBlock tex="y^* > 0" />. Then <MathBlock tex="P(y=1) = P(y^* > 0) = \Phi(X\beta)" />.
      </p>

      <h2>Logit vs. Probit: When to Use Which</h2>
      <p>
        In practice, logit and probit produce very similar results. The two CDFs have nearly identical
        shapes, differing mainly in the tails (the logistic has slightly heavier tails).
      </p>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li><strong>Logit:</strong> Preferred when you want odds ratio interpretations, or in fields like epidemiology and marketing where odds ratios are standard.</li>
        <li><strong>Probit:</strong> Preferred in economics (especially with latent variable motivation) and when the model will be extended to ordered/multinomial outcomes.</li>
        <li><strong>Rule of thumb:</strong> Coefficients are approximately related by <MathBlock tex="\beta_{probit} \approx \frac{\beta_{logit}}{1.6}" />.</li>
      </ul>

      <h2>Maximum Likelihood Estimation</h2>
      <p>
        Unlike OLS, binary response models are estimated using{' '}
        <ConceptLink conceptId="mle">Maximum Likelihood Estimation (MLE)</ConceptLink>. The
        likelihood function for the logit model is:
      </p>
      <MathBlock tex="\mathcal{L}(\beta) = \prod_{i=1}^n \Lambda(X_i\beta)^{y_i} \left[1 - \Lambda(X_i\beta)\right]^{1-y_i}" display />
      <p>
        Taking the log and maximizing numerically (using Newton-Raphson or similar) yields{' '}
        <MathBlock tex="\hat{\beta}_{MLE}" />. MLE estimators are consistent, asymptotically
        normal, and asymptotically efficient.
      </p>
      <p>
        Note: there is no closed-form solution. Software uses iterative algorithms, which is why
        you may see "convergence" messages when fitting these models.
      </p>

      <h2>Model Evaluation</h2>
      <p>
        For binary classifiers, accuracy alone is often misleading (especially with imbalanced classes).
        Use multiple metrics:
      </p>

      <h3>Confusion Matrix</h3>
      <p>
        The <ConceptLink conceptId="confusion-matrix">confusion matrix</ConceptLink> cross-tabulates
        predicted vs. actual classes:
      </p>
      <div className="overflow-x-auto my-4">
        <table className="text-sm border-collapse w-full max-w-md mx-auto">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="p-2"></th>
              <th className="p-2 text-center">Predicted Positive</th>
              <th className="p-2 text-center">Predicted Negative</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr>
              <td className="p-2 font-semibold">Actual Positive</td>
              <td className="p-2 text-center text-green-600 dark:text-green-400">True Positive (TP)</td>
              <td className="p-2 text-center text-red-600 dark:text-red-400">False Negative (FN)</td>
            </tr>
            <tr>
              <td className="p-2 font-semibold">Actual Negative</td>
              <td className="p-2 text-center text-red-600 dark:text-red-400">False Positive (FP)</td>
              <td className="p-2 text-center text-green-600 dark:text-green-400">True Negative (TN)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        From this matrix we derive:
      </p>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li><strong>Accuracy:</strong> <MathBlock tex="(TP + TN) / (TP + TN + FP + FN)" /></li>
        <li><strong>Precision:</strong> <MathBlock tex="TP / (TP + FP)" /> — of those predicted positive, how many actually are?</li>
        <li><strong>Recall (Sensitivity):</strong> <MathBlock tex="TP / (TP + FN)" /> — of actual positives, how many did we catch?</li>
        <li><strong>F1 Score:</strong> Harmonic mean of precision and recall</li>
      </ul>

      <h3>ROC Curve and AUC</h3>
      <p>
        The <ConceptLink conceptId="roc-curve">ROC curve</ConceptLink> plots the True Positive Rate
        (recall) against the False Positive Rate across all classification thresholds. The{' '}
        <ConceptLink conceptId="auc">Area Under the Curve (AUC)</ConceptLink> summarizes
        discriminatory power:
      </p>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>AUC = 0.5: no discrimination (random guessing)</li>
        <li>AUC = 0.7–0.8: acceptable discrimination</li>
        <li>AUC = 0.8–0.9: excellent discrimination</li>
        <li>AUC &gt; 0.9: outstanding (but check for overfitting)</li>
      </ul>

      <DecisionScenario
        scenario="You've built a logistic regression model to predict loan defaults. Your model has 95% accuracy but only 30% recall on the default class (which comprises 5% of the data). Your manager asks: 'Is this model good enough to deploy?'"
        choices={[
          { label: "Yes, 95% accuracy is excellent", explanation: "With 5% default rate, a model that predicts 'no default' for everyone would achieve 95% accuracy. Your model may not be much better than this naive baseline. Accuracy is misleading with imbalanced classes.", isRecommended: false },
          { label: "No, focus on improving recall for the minority class", explanation: "Correct! In lending, missing a default (false negative) is very costly. You should focus on recall and use metrics like AUC, precision-recall curves, or F1. Adjusting the classification threshold, oversampling defaults, or using cost-sensitive learning can help.", isRecommended: true },
          { label: "Retrain with a neural network for better accuracy", explanation: "Switching to a more complex model won't fix the class imbalance problem. The issue is the evaluation metric and the data distribution, not the model family. Address class imbalance first, then consider model complexity.", isRecommended: false },
        ]}
      />

      <KeyTakeaways items={[
        "The Linear Probability Model is easy to interpret but produces invalid predictions outside [0,1] — use logit or probit for binary outcomes.",
        "Logistic regression coefficients are log-odds ratios; exponentiate them to get odds ratios. For probability changes, compute marginal effects.",
        "Logit and probit produce very similar results; choose logit for odds ratio interpretation, probit for latent variable motivation.",
        "With imbalanced classes, accuracy is misleading — use the confusion matrix, precision, recall, F1, and AUC-ROC for evaluation.",
      ]} />

      <QuizSection chapterId="ch3" />
    </ChapterLayout>
  )
}
