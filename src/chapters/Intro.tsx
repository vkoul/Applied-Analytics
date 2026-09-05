import { Link } from 'react-router-dom'
import { ChapterLayout } from '../components/content/ChapterLayout'

export default function Intro() {
  return (
    <ChapterLayout title="Applied Analytics Methods" subtitle="An Interactive Textbook on Generalized Analytics for Business">
      <section>
        <h2 id="about-this-textbook">About This Textbook</h2>
        <p>
          This interactive textbook covers the material from the <strong>Generalized Analytics
          for Business (GAB)</strong> course, part of the Georgia Tech GTx Data Analytics for
          Business (DAB) program on edX. It presents advanced statistical modeling methods that
          go beyond ordinary linear regression, covering the full spectrum from binary response
          models to deep learning.
        </p>
        <p>
          The textbook transforms lecture slide content into an interactive learning experience
          with nested concept tooltips, quizzes, flashcards, code examples in both Python and R,
          and interactive visualizations that let you explore how model parameters affect outcomes.
        </p>
      </section>

      <section className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg p-4">
        <p className="font-semibold text-yellow-900 dark:text-yellow-200 text-sm">Note</p>
        <p className="text-sm text-yellow-800 dark:text-yellow-300 mt-2">
          This interactive textbook is an independent study aid and may omit images, charts, and
          other visual materials from the original course slides. For the complete course experience
          including video lectures and graded assignments, please enroll in the official GTx DAB
          program on edX.
        </p>
      </section>

      <section>
        <h2 id="what-youll-learn">What You Will Learn</h2>
        <p>
          This course equips you with a toolkit of statistical models, each designed for a specific
          type of data challenge. By the end, you will know which model to reach for based on the
          nature of your response variable and the structure of your data.
        </p>
      </section>

      <section>
        <h2 id="course-roadmap">Course Roadmap</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-1">
              <Link to="/ch1" className="text-blue-600 dark:text-blue-400 hover:underline">
                1. Introduction to Analytics
              </Link>
            </h3>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300 text-sm">
              <li>Descriptive, predictive, and prescriptive analytics</li>
              <li>Data types: cross-sectional, time series, panel</li>
              <li>The analytics pipeline and the GLM framework</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-1">
              <Link to="/ch2" className="text-blue-600 dark:text-blue-400 hover:underline">
                2. Linear Models &amp; OLS Regression
              </Link>
            </h3>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300 text-sm">
              <li>OLS estimation, Gauss-Markov assumptions</li>
              <li>Diagnostics: R-squared, VIF, heteroscedasticity</li>
              <li>Model selection: AIC, BIC, transformations</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-1">
              <Link to="/ch3" className="text-blue-600 dark:text-blue-400 hover:underline">
                3. Binary Response Models
              </Link>
            </h3>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300 text-sm">
              <li>Logistic regression, probit, MLE</li>
              <li>Odds ratios and marginal effects</li>
              <li>ROC curves, confusion matrix, AUC</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-1">
              <Link to="/ch4" className="text-blue-600 dark:text-blue-400 hover:underline">
                4. Censored Data &amp; Tobit Model
              </Link>
            </h3>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300 text-sm">
              <li>Censoring vs. truncation</li>
              <li>Tobit model and MLE</li>
              <li>Marginal effects and inverse Mills ratio</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-1">
              <Link to="/ch5" className="text-blue-600 dark:text-blue-400 hover:underline">
                5. Count Data Models
              </Link>
            </h3>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300 text-sm">
              <li>Poisson regression and overdispersion</li>
              <li>Negative binomial model</li>
              <li>Zero-inflated models (ZIP, ZINB)</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-1">
              <Link to="/ch6" className="text-blue-600 dark:text-blue-400 hover:underline">
                6. Survival Analysis
              </Link>
            </h3>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300 text-sm">
              <li>Kaplan-Meier estimator and log-rank test</li>
              <li>Cox proportional hazards model</li>
              <li>Parametric models: exponential, Weibull</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-1">
              <Link to="/ch7" className="text-blue-600 dark:text-blue-400 hover:underline">
                7. Discrete Choice Models
              </Link>
            </h3>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300 text-sm">
              <li>Multinomial logit and IIA</li>
              <li>Nested logit and mixed logit</li>
              <li>Random utility theory</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-1">
              <Link to="/ch8" className="text-blue-600 dark:text-blue-400 hover:underline">
                8. Instrumental Variables
              </Link>
            </h3>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300 text-sm">
              <li>Endogeneity and omitted variable bias</li>
              <li>Two-stage least squares (2SLS)</li>
              <li>Hausman test and weak instruments</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-1">
              <Link to="/ch9" className="text-blue-600 dark:text-blue-400 hover:underline">
                9. Clustering Methods
              </Link>
            </h3>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300 text-sm">
              <li>K-means, hierarchical, DBSCAN</li>
              <li>Elbow method and silhouette analysis</li>
              <li>Customer segmentation applications</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-1">
              <Link to="/ch10" className="text-blue-600 dark:text-blue-400 hover:underline">
                10. Text Mining &amp; NLP
              </Link>
            </h3>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300 text-sm">
              <li>Tokenization, TF-IDF, bag of words</li>
              <li>Sentiment analysis and topic modeling (LDA)</li>
              <li>Document similarity</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-1">
              <Link to="/ch11" className="text-blue-600 dark:text-blue-400 hover:underline">
                11. Neural Networks
              </Link>
            </h3>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300 text-sm">
              <li>Perceptrons, activation functions, MLP</li>
              <li>Backpropagation and gradient descent</li>
              <li>Regularization and universal approximation</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-1">
              <Link to="/ch12" className="text-blue-600 dark:text-blue-400 hover:underline">
                12. Deep Learning
              </Link>
            </h3>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300 text-sm">
              <li>CNNs, RNNs, and LSTMs</li>
              <li>Dropout and batch normalization</li>
              <li>Transfer learning</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 id="features">Interactive Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-3">
            <p className="font-semibold text-blue-900 dark:text-blue-200 text-sm">Nested Tooltips</p>
            <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">Hover any highlighted term to see its definition. Tooltips can nest up to 4 levels deep.</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-3">
            <p className="font-semibold text-green-900 dark:text-green-200 text-sm">Quizzes &amp; Flashcards</p>
            <p className="text-xs text-green-700 dark:text-green-300 mt-1">5 quiz questions and 5 flashcards per chapter with progress tracking.</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg p-3">
            <p className="font-semibold text-purple-900 dark:text-purple-200 text-sm">Interactive Widgets</p>
            <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">Every chapter has a hands-on visualization — drag sliders to explore model behavior.</p>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-3">
            <p className="font-semibold text-amber-900 dark:text-amber-200 text-sm">Code Examples</p>
            <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">Python and R code for every model, with a toggle and copy button.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 id="development">Interactive Textbook Development</h2>
        <div className="space-y-3">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
            <p className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Developer</p>
            <p className="text-gray-700 dark:text-gray-300 mb-3">Vikesh Koul</p>
            <div className="flex gap-4">
              <a href="https://github.com/vkoul" target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded transition-colors text-sm font-medium">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/vikeshkoul/" target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded transition-colors text-sm font-medium">
                LinkedIn
              </a>
            </div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg p-4">
            <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">AI Collaborator</p>
            <p className="text-gray-700 dark:text-gray-300">
              Claude (Anthropic AI) — for building interactive components, generating content,
              and enhancing the learning experience
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-lg p-4">
        <h2 id="disclaimer" className="text-lg font-semibold mb-3">Disclaimer</h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
          This is an <strong>independent, unofficial study aid</strong> and is not affiliated with,
          endorsed by, or officially associated with Georgia Institute of Technology, Georgia Tech
          Professional Education, edX, or any of their instructors or staff.
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
          The content was generated with AI assistance based on course slide topics. While care was
          taken to ensure accuracy, <strong>this content has not been reviewed by the course
          instructors and may contain errors, oversimplifications, or inaccuracies</strong>. Always
          cross-reference with official course materials.
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          If you find an error, please report it on the{' '}
          <a
            href="https://github.com/vkoul/Applied-Analytics/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
          >
            GitHub issues page
          </a>
          .
        </p>
      </section>
    </ChapterLayout>
  )
}
