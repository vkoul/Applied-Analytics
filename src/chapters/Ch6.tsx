import { ChapterLayout } from '../components/content/ChapterLayout'
import { ConceptLink } from '../components/tooltip/ConceptLink'
import { MathBlock } from '../components/content/MathBlock'
import { ExpandableReading } from '../components/content/ExpandableReading'
import { KeyTakeaways } from '../components/content/KeyTakeaways'
import { DecisionScenario } from '../components/content/DecisionScenario'
import { QuizSection } from '../components/content/QuizSection'
import { SurvivalCurveExplorer } from '../components/widgets/SurvivalCurveExplorer'

export default function Ch6() {
  return (
    <ChapterLayout title="Chapter 6: Survival Analysis" subtitle="Modeling time-to-event data with censoring, Kaplan-Meier, and Cox regression">

      {/* === Learning Objectives === */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg">
        <h3 className="font-semibold text-blue-800 dark:text-blue-200">Learning Objectives</h3>
        <ul className="list-disc list-inside text-sm text-blue-700 dark:text-blue-300 mt-2 space-y-1">
          <li>Understand the structure of survival data and why <ConceptLink conceptId="censoring">right censoring</ConceptLink> requires special methods</li>
          <li>Define and interpret the <ConceptLink conceptId="survival-function">survival function</ConceptLink> and <ConceptLink conceptId="hazard-function">hazard function</ConceptLink></li>
          <li>Estimate and plot survival curves using the <ConceptLink conceptId="kaplan-meier">Kaplan-Meier estimator</ConceptLink></li>
          <li>Formulate and interpret a <ConceptLink conceptId="cox-model">Cox proportional hazards</ConceptLink> model</li>
          <li>Assess the <ConceptLink conceptId="proportional-hazards">proportional hazards assumption</ConceptLink></li>
        </ul>
      </div>

      {/* === Section 1: Survival Data and Censoring === */}
      <h2>Survival Data and Censoring</h2>
      <p>
        Survival analysis deals with <strong>time-to-event</strong> data: how long until a customer churns, a patient
        recovers, a machine fails, or an employee leaves. The response variable is the duration from some starting point
        to the occurrence of an event of interest.
      </p>
      <p>
        The fundamental challenge in survival analysis is <ConceptLink conceptId="censoring">censoring</ConceptLink>.
        Not all subjects experience the event during the observation period. When a subject's event time is unknown because
        the study ended or the subject withdrew, we only know that the true event time exceeds the observed time. This is
        called <strong>right censoring</strong> and it is the most common form.
      </p>
      <p>
        Simply ignoring censored observations (dropping them from the analysis) wastes information and introduces bias.
        Simply treating the censored time as the actual event time also introduces bias (underestimating true survival times).
        Survival analysis methods are specifically designed to extract valid information from both censored and uncensored observations.
      </p>

      {/* === Section 2: Survival Function and Hazard Function === */}
      <h2>Survival Function and Hazard Function</h2>
      <p>
        The <ConceptLink conceptId="survival-function">survival function</ConceptLink> <MathBlock tex="S(t)" /> gives the
        probability that the event has not yet occurred by time <MathBlock tex="t" />:
      </p>
      <MathBlock tex="S(t) = P(T > t) = 1 - F(t)" display />
      <p>
        where <MathBlock tex="F(t)" /> is the cumulative distribution function of the event time <MathBlock tex="T" />.
        The survival function starts at <MathBlock tex="S(0) = 1" /> (everyone is "alive" at the start) and
        decreases monotonically toward 0.
      </p>
      <p>
        The <ConceptLink conceptId="hazard-function">hazard function</ConceptLink> <MathBlock tex="h(t)" /> captures the
        instantaneous rate of the event occurring at time <MathBlock tex="t" />, given survival up to that point:
      </p>
      <MathBlock tex="h(t) = \lim_{\Delta t \to 0} \frac{P(t \le T < t + \Delta t \mid T \ge t)}{\Delta t}" display />
      <p>
        The hazard is not a probability (it can exceed 1); rather, it is a rate. High hazard means the event is likely
        to happen soon. The cumulative hazard <MathBlock tex="H(t) = \int_0^t h(u)\,du" /> connects to the survival
        function via:
      </p>
      <MathBlock tex="S(t) = e^{-H(t)} \quad \Longleftrightarrow \quad h(t) = -\frac{d}{dt}\ln S(t)" display />

      {/* === Section 3: Kaplan-Meier Estimator === */}
      <h2>The Kaplan-Meier Estimator</h2>
      <p>
        The <ConceptLink conceptId="kaplan-meier">Kaplan-Meier (KM) estimator</ConceptLink> is a non-parametric method
        for estimating the survival function from observed data. It does not assume any particular distribution for
        the event times.
      </p>
      <p>
        At each observed event time <MathBlock tex="t_j" />, the KM estimator computes the conditional probability of
        surviving past <MathBlock tex="t_j" />, given survival up to just before <MathBlock tex="t_j" />:
      </p>
      <MathBlock tex="\hat{S}(t) = \prod_{t_j \le t} \left(1 - \frac{d_j}{n_j}\right)" display />
      <p>
        where <MathBlock tex="d_j" /> is the number of events at time <MathBlock tex="t_j" /> and{' '}
        <MathBlock tex="n_j" /> is the number of subjects at risk just before <MathBlock tex="t_j" />.
        Censored observations reduce the risk set but do not contribute events. The result is a step function
        that drops at each event time.
      </p>
      <p>
        To compare KM curves between groups (e.g., treatment vs. control), we use the{' '}
        <ConceptLink conceptId="log-rank-test">log-rank test</ConceptLink>. This non-parametric test assesses whether
        the survival distributions of two or more groups are statistically significantly different. It compares the
        observed number of events in each group to what would be expected if the survival functions were identical.
      </p>

      {/* === Section 4: Cox Proportional Hazards Model === */}
      <h2>Cox Proportional Hazards Model</h2>
      <p>
        While Kaplan-Meier is useful for visualization and simple comparisons, it cannot incorporate multiple covariates
        simultaneously. The <ConceptLink conceptId="cox-model">Cox proportional hazards model</ConceptLink> is a
        semi-parametric regression model that relates the hazard to covariates:
      </p>
      <MathBlock tex="h(t \mid X) = h_0(t) \cdot \exp(X\beta)" display />
      <p>
        Here, <MathBlock tex="h_0(t)" /> is the <ConceptLink conceptId="baseline-hazard">baseline hazard</ConceptLink> — an
        unspecified, non-negative function of time. The term <MathBlock tex="\exp(X\beta)" /> is the relative risk
        associated with covariates <MathBlock tex="X" />. The model is semi-parametric because{' '}
        <MathBlock tex="h_0(t)" /> is left completely unspecified while the covariate effects are parametric.
      </p>
      <p>
        Exponentiated coefficients <MathBlock tex="e^{\beta_j}" /> are{' '}
        <ConceptLink conceptId="hazard-ratio">hazard ratios</ConceptLink>. A hazard ratio of 1.5 for a binary covariate
        means the event rate is 50% higher for one group compared to the other, at every point in time. This "at every
        point in time" is exactly the <ConceptLink conceptId="proportional-hazards">proportional hazards</ConceptLink>{' '}
        assumption — the hazard ratio is constant over time.
      </p>

      <SurvivalCurveExplorer />

      <ExpandableReading title="Deep Dive: Checking the Proportional Hazards Assumption">
        <p>
          The proportional hazards (PH) assumption is the central assumption of the Cox model. There are several ways
          to check it:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li><strong>Schoenfeld residuals:</strong> Plot the scaled Schoenfeld residuals against time for each covariate. A non-random pattern (trend) indicates violation of PH.</li>
          <li><strong>Log-log plot:</strong> Plot <MathBlock tex="\ln(-\ln(\hat{S}(t)))" /> versus <MathBlock tex="\ln(t)" /> for different groups. Parallel curves support PH; crossing curves violate it.</li>
          <li><strong>Time interactions:</strong> Add interaction terms between covariates and time (or a function of time). If significant, PH is violated for that covariate.</li>
        </ul>
        <p>
          When PH is violated, options include stratifying the Cox model by the offending variable, adding time-varying
          coefficients, or switching to a parametric accelerated failure time (AFT) model.
        </p>
      </ExpandableReading>

      {/* === Section 5: Parametric Survival Models === */}
      <h2>Parametric Survival Models</h2>
      <p>
        Unlike the Cox model, parametric survival models specify a distribution for the event times. Common choices include:
      </p>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li><strong>Exponential:</strong> Assumes a constant hazard. Simple but often unrealistic — it implies that the probability of the event occurring does not change with time.</li>
        <li><strong><ConceptLink conceptId="weibull-distribution">Weibull</ConceptLink>:</strong> Generalizes the exponential by allowing the hazard to increase or decrease monotonically with time. A shape parameter <MathBlock tex="p > 1" /> gives increasing hazard; <MathBlock tex="p < 1" /> gives decreasing hazard; <MathBlock tex="p = 1" /> reduces to exponential.</li>
        <li><strong>Log-normal and log-logistic:</strong> Allow non-monotone hazards (e.g., a hazard that increases and then decreases).</li>
      </ul>
      <p>
        Parametric models are more efficient (narrower confidence intervals) when the distributional assumption is correct,
        but they can be badly biased when the assumption is wrong. The Cox model trades some efficiency for robustness.
      </p>

      {/* === Decision Scenario === */}
      <DecisionScenario
        scenario="You are analyzing customer churn for a subscription service. You have data on 10,000 customers, their subscription start dates, whether they churned, and several covariates (plan type, usage, demographics). About 30% of customers are still active (right-censored). You want to understand which factors influence churn timing. Which approach do you take?"
        choices={[
          {
            label: "Kaplan-Meier curves only",
            explanation: "KM curves are a great starting point for visualization, but they cannot assess the simultaneous effect of multiple covariates. You would need to create separate curves for each variable, and you could not control for confounding. This is good for initial exploration but insufficient for a full analysis.",
            isRecommended: false,
          },
          {
            label: "Cox Proportional Hazards Model",
            explanation: "This is the best choice. Cox regression handles right censoring correctly, accommodates multiple covariates, and does not require specifying a distribution for churn times. You can estimate hazard ratios for each factor while controlling for others. Start by fitting the model, then check the PH assumption using Schoenfeld residuals. If PH is violated for some covariates, consider stratification or time interactions.",
            isRecommended: true,
          },
          {
            label: "Weibull parametric model",
            explanation: "A Weibull model could work if you are confident that the baseline hazard is monotone. However, in subscription services, churn hazard often has a non-monotone shape (high initially, then decreasing for loyal customers, then increasing again). The Cox model is safer because it leaves the baseline hazard unspecified.",
            isRecommended: false,
          },
        ]}
      />

      {/* === Key Takeaways === */}
      <KeyTakeaways items={[
        "Survival analysis is essential whenever you have time-to-event data with censoring — ignoring censored observations biases results.",
        "The Kaplan-Meier estimator provides non-parametric survival curves; the log-rank test compares them between groups.",
        "The Cox proportional hazards model is the workhorse for multivariate survival analysis — it estimates hazard ratios without specifying the baseline hazard.",
        "Always check the proportional hazards assumption using Schoenfeld residuals or log-log plots before interpreting Cox model results.",
      ]} />

      {/* === Quiz === */}
      <QuizSection chapterId="ch6" />
    </ChapterLayout>
  )
}
