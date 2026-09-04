import { ChapterLayout } from '../components/content/ChapterLayout'
import { ConceptLink } from '../components/tooltip/ConceptLink'
import { MathBlock } from '../components/content/MathBlock'
import { ExpandableReading } from '../components/content/ExpandableReading'
import { KeyTakeaways } from '../components/content/KeyTakeaways'
import { DecisionScenario } from '../components/content/DecisionScenario'
import { QuizSection } from '../components/content/QuizSection'

export default function Ch1() {
  return (
    <ChapterLayout title="Chapter 1: Introduction to Analytics" subtitle="Foundations of applied analytics for business decisions">
      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg">
        <h3 className="font-semibold text-blue-800 dark:text-blue-200">Learning Objectives</h3>
        <ul className="list-disc list-inside text-sm text-blue-700 dark:text-blue-300 mt-2 space-y-1">
          <li>Understand the three types of business analytics</li>
          <li>Identify different data types and their implications for modeling</li>
          <li>Describe the analytics pipeline from data to decision</li>
          <li>Recognize when linear regression is insufficient</li>
        </ul>
      </div>

      <h2>What Is Business Analytics?</h2>
      <p>
        Business analytics uses data, statistical methods, and quantitative models to drive
        business decisions. It goes beyond simple reporting to extract actionable insights
        from complex datasets. In modern organizations, analytics is the bridge between
        raw data and strategic action.
      </p>
      <p>
        Analytics can be divided into three categories, each building upon the previous:
      </p>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li><strong>Descriptive analytics:</strong> What happened? Summarizes historical data using statistics and visualization. Examples include dashboards, KPI reports, and trend analysis.</li>
        <li><strong>Predictive analytics:</strong> What will happen? Uses <ConceptLink conceptId="regression">regression</ConceptLink>, classification, and machine learning to forecast future outcomes.</li>
        <li><strong>Prescriptive analytics:</strong> What should we do? Combines predictive models with optimization to recommend actions.</li>
      </ul>

      <h2>Types of Data</h2>
      <p>
        The type of data you have determines which models are appropriate. Understanding data structure
        is the first step in any analytics project.
      </p>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li><strong><ConceptLink conceptId="cross-sectional-data">Cross-sectional data</ConceptLink>:</strong> Observations on multiple entities at a single point in time. For example, surveying 500 customers about their satisfaction today.</li>
        <li><strong><ConceptLink conceptId="time-series-data">Time series data</ConceptLink>:</strong> Observations on a single entity over multiple time periods. For example, monthly revenue for one store over 5 years.</li>
        <li><strong><ConceptLink conceptId="panel-data">Panel data</ConceptLink>:</strong> Observations on multiple entities over multiple time periods. Combines the richness of both cross-sectional and time series data.</li>
      </ul>

      <h2>The Analytics Pipeline</h2>
      <p>
        Every analytics project follows a common workflow, regardless of the specific methods used:
      </p>
      <ol className="list-decimal list-inside space-y-2 ml-4">
        <li><strong>Data collection:</strong> Gathering data from internal systems, surveys, web scraping, APIs, or third-party sources.</li>
        <li><strong>Data cleaning:</strong> Handling missing values, outliers, inconsistencies, and formatting issues. This often consumes 60-80% of project time.</li>
        <li><strong>Exploratory analysis:</strong> Visualizing distributions, correlations, and patterns to form hypotheses.</li>
        <li><strong>Modeling:</strong> Selecting and fitting appropriate statistical or machine learning models.</li>
        <li><strong>Interpretation:</strong> Translating model output into business insights with proper uncertainty quantification.</li>
        <li><strong>Decision &amp; action:</strong> Using insights to inform strategy, policy, or operational changes.</li>
      </ol>

      <h2>Why Go Beyond Linear Regression?</h2>
      <p>
        <ConceptLink conceptId="ols">Ordinary Least Squares (OLS)</ConceptLink> regression is
        the workhorse of analytics, but it makes strong assumptions that often don't hold in practice:
      </p>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li>The dependent variable is continuous and unbounded — but what if it's binary (yes/no), a count, or censored?</li>
        <li>The relationship is linear — but many business phenomena are nonlinear.</li>
        <li>Observations are independent — but customers in the same market may be correlated.</li>
        <li>Explanatory variables are exogenous — but what if there's <ConceptLink conceptId="endogeneity">endogeneity</ConceptLink>?</li>
      </ul>
      <p>
        This course introduces a toolkit of <ConceptLink conceptId="generalized-linear-model">generalized models</ConceptLink> designed
        for the specific data types and violations you'll encounter in real business problems.
      </p>

      <h2>Course Roadmap</h2>
      <p>
        Each week introduces a model tailored to a specific type of response variable or data challenge:
      </p>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="text-left p-2">Week</th>
              <th className="text-left p-2">Topic</th>
              <th className="text-left p-2">When to Use</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr><td className="p-2">1</td><td className="p-2">Linear Models</td><td className="p-2">Continuous, unbounded response</td></tr>
            <tr><td className="p-2">2</td><td className="p-2">Binary Response</td><td className="p-2">Yes/no outcome (e.g., churn, purchase)</td></tr>
            <tr><td className="p-2">3</td><td className="p-2">Censored Data</td><td className="p-2">Response is partially observed (e.g., spending with floor at 0)</td></tr>
            <tr><td className="p-2">4</td><td className="p-2">Count Models</td><td className="p-2">Response is a non-negative integer (e.g., number of claims)</td></tr>
            <tr><td className="p-2">5</td><td className="p-2">Survival Analysis</td><td className="p-2">Time-to-event data (e.g., customer lifetime)</td></tr>
            <tr><td className="p-2">6</td><td className="p-2">Discrete Choice</td><td className="p-2">Choosing among 3+ alternatives</td></tr>
            <tr><td className="p-2">7</td><td className="p-2">Instrumental Variables</td><td className="p-2">Endogenous regressors</td></tr>
            <tr><td className="p-2">8</td><td className="p-2">Clustering</td><td className="p-2">Unsupervised grouping</td></tr>
            <tr><td className="p-2">9-11</td><td className="p-2">Text Mining, Neural Nets, Deep Learning</td><td className="p-2">Unstructured data and complex patterns</td></tr>
          </tbody>
        </table>
      </div>

      <ExpandableReading title="Deep Dive: The Generalized Linear Model Framework">
        <p>
          Many of the models in this course are special cases of the <ConceptLink conceptId="generalized-linear-model">Generalized Linear Model (GLM)</ConceptLink> framework.
          A GLM has three components:
        </p>
        <ol className="list-decimal list-inside space-y-1 ml-4">
          <li>A <strong>random component</strong>: the probability distribution of the response variable (Normal, Binomial, Poisson, etc.)</li>
          <li>A <strong>systematic component</strong>: the linear predictor <MathBlock tex="\eta = X\beta" /></li>
          <li>A <strong>link function</strong>: connects the mean of the response to the linear predictor, e.g., <MathBlock tex="g(\mu) = \eta" /></li>
        </ol>
        <p>
          OLS is a GLM with a Normal distribution and identity link. Logistic regression uses a Binomial distribution and logit link.
          Poisson regression uses a Poisson distribution and log link. Recognizing this unifying framework helps you choose the right model for your data.
        </p>
      </ExpandableReading>

      <DecisionScenario
        scenario="You're analyzing customer churn for a telecom company. Your dependent variable is whether a customer left (1) or stayed (0) in the past quarter. A colleague suggests using OLS regression. What do you recommend?"
        choices={[
          { label: "Use OLS regression as suggested", explanation: "OLS can produce predicted probabilities outside [0,1] for binary outcomes, leading to nonsensical predictions. It also violates the normality assumption since the errors follow a Bernoulli distribution.", isRecommended: false },
          { label: "Use logistic regression", explanation: "Correct! Logistic regression is designed for binary outcomes. It models the log-odds of the event and ensures predicted probabilities stay in [0,1]. This is covered in Chapter 3.", isRecommended: true },
          { label: "Use a neural network for better accuracy", explanation: "While neural networks can handle binary classification, they're often overkill for structured tabular data and sacrifice interpretability. Start with logistic regression, which gives you odds ratios and clear inference.", isRecommended: false },
        ]}
      />

      <KeyTakeaways items={[
        "Analytics spans descriptive → predictive → prescriptive, each adding more value and complexity.",
        "The type of your response variable (continuous, binary, count, censored, time-to-event) dictates which model family to use — OLS is only one option.",
        "Most models in this course are special cases of the GLM framework, sharing the same estimation logic (MLE) but with different distributional assumptions.",
        "Understanding your data structure (cross-sectional, time series, panel) is the first step before choosing a model.",
      ]} />

      <QuizSection chapterId="ch1" />
    </ChapterLayout>
  )
}
