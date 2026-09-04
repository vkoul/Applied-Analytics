import { ChapterLayout } from '../components/content/ChapterLayout'
import { ConceptLink } from '../components/tooltip/ConceptLink'
import { MathBlock } from '../components/content/MathBlock'
import { ExpandableReading } from '../components/content/ExpandableReading'
import { KeyTakeaways } from '../components/content/KeyTakeaways'
import { DecisionScenario } from '../components/content/DecisionScenario'
import { QuizSection } from '../components/content/QuizSection'

export default function Ch11() {
  return (
    <ChapterLayout title="Chapter 11: Neural Networks" subtitle="From the perceptron to multi-layer networks and backpropagation">
      {/* === Learning Objectives === */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg">
        <h3 className="font-semibold text-blue-800 dark:text-blue-200">Learning Objectives</h3>
        <ul className="list-disc list-inside text-sm text-blue-700 dark:text-blue-300 mt-2 space-y-1">
          <li>Understand the perceptron as the building block of neural networks</li>
          <li>Compare activation functions: sigmoid, tanh, and ReLU</li>
          <li>Describe the architecture and forward propagation of a multi-layer perceptron</li>
          <li>Explain how backpropagation computes gradients for learning</li>
          <li>Understand the role of loss functions and gradient descent in training</li>
          <li>Apply regularization techniques to prevent overfitting in neural networks</li>
        </ul>
      </div>

      {/* === The Perceptron === */}
      <h2>The Perceptron</h2>
      <p>
        The <ConceptLink conceptId="perceptron">perceptron</ConceptLink>, introduced by Frank
        Rosenblatt in 1958, is the simplest neural network. It takes a vector of inputs{' '}
        <MathBlock tex="x_1, x_2, \ldots, x_p" />, multiplies each by a learnable weight{' '}
        <MathBlock tex="w_i" />, adds a bias <MathBlock tex="b" />, and passes the result through
        an <ConceptLink conceptId="activation-function">activation function</ConceptLink>{' '}
        <MathBlock tex="f" />:
      </p>
      <MathBlock tex="y = f\!\left(\sum_{i=1}^{p} w_i x_i + b\right) = f(\mathbf{w}^T \mathbf{x} + b)" display />
      <p>
        If the activation function is a step function (outputting 0 or 1), the perceptron is a
        binary classifier — geometrically, it defines a hyperplane that separates two classes. This
        is closely related to <ConceptLink conceptId="logistic-regression">logistic regression</ConceptLink>,
        which uses the smooth <ConceptLink conceptId="sigmoid-function">sigmoid function</ConceptLink>{' '}
        instead of a hard step.
      </p>
      <p>
        A single perceptron can only learn <em>linearly separable</em> patterns. The famous XOR
        problem showed that some simple patterns require multiple layers — a discovery that stalled
        neural network research for over a decade.
      </p>

      {/* === Activation Functions === */}
      <h2>Activation Functions</h2>
      <p>
        The <ConceptLink conceptId="activation-function">activation function</ConceptLink> introduces
        nonlinearity, which is what gives neural networks their power. Without nonlinear activations,
        stacking layers would reduce to a single linear transformation.
      </p>

      <h3>Sigmoid</h3>
      <MathBlock tex="\sigma(z) = \frac{1}{1 + e^{-z}}" display />
      <p>
        The <ConceptLink conceptId="sigmoid-function">sigmoid</ConceptLink> squashes any input
        into the range (0, 1). It was historically popular for hidden layers but suffers from the{' '}
        <ConceptLink conceptId="vanishing-gradient">vanishing gradient problem</ConceptLink>: for
        very large or very small inputs, the gradient approaches zero, making learning extremely slow
        in deep networks.
      </p>

      <h3>Tanh</h3>
      <MathBlock tex="\tanh(z) = \frac{e^z - e^{-z}}{e^z + e^{-z}}" display />
      <p>
        Tanh is centered at zero (output range (–1, 1)), which generally leads to faster convergence
        than sigmoid. However, it still suffers from vanishing gradients at extreme values.
      </p>

      <h3>ReLU (Rectified Linear Unit)</h3>
      <MathBlock tex="f(z) = \max(0, z)" display />
      <p>
        <ConceptLink conceptId="relu">ReLU</ConceptLink> is the default activation for most modern
        networks. It is computationally efficient and does not saturate for positive values, which
        alleviates the vanishing gradient problem. Its main issue is "dying ReLU": neurons with
        negative inputs always output zero and stop learning. Variants like Leaky ReLU{' '}
        (<MathBlock tex="f(z) = \max(0.01z, z)" />) address this.
      </p>

      {/* === Multi-Layer Perceptron === */}
      <h2>Multi-Layer Perceptron (MLP)</h2>
      <p>
        A <strong>multi-layer perceptron</strong> stacks multiple layers of perceptrons:
      </p>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li><strong>Input layer:</strong> Receives the feature vector <MathBlock tex="\mathbf{x}" />.</li>
        <li><strong>Hidden layers:</strong> One or more layers of neurons with learnable weights and nonlinear activations. Each neuron computes a weighted sum of its inputs, adds a bias, and applies the activation function.</li>
        <li><strong>Output layer:</strong> Produces the final prediction. For regression, this is typically a single neuron with no activation (linear output). For binary classification, a single neuron with sigmoid. For multi-class, multiple neurons with softmax.</li>
      </ul>
      <p>
        The <ConceptLink conceptId="universal-approximation">universal approximation theorem</ConceptLink>{' '}
        states that a single hidden layer with sufficient neurons can approximate <em>any</em>{' '}
        continuous function to arbitrary accuracy. In practice, deeper networks (more layers with
        fewer neurons each) tend to learn more efficiently than wide shallow networks.
      </p>

      {/* === Loss Functions and Training === */}
      <h2>Loss Functions and Training</h2>
      <p>
        Training a neural network means finding the weights that minimize a{' '}
        <ConceptLink conceptId="loss-function">loss function</ConceptLink> that measures the
        discrepancy between predictions and true values. Common choices:
      </p>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li><strong>Mean Squared Error (MSE)</strong> for regression: <MathBlock tex="L = \frac{1}{n}\sum_{i=1}^{n}(y_i - \hat{y}_i)^2" /></li>
        <li><strong><ConceptLink conceptId="cross-entropy">Cross-entropy</ConceptLink></strong> for classification: <MathBlock tex="L = -\sum_{i=1}^{n}\left[y_i \log(\hat{y}_i) + (1-y_i)\log(1-\hat{y}_i)\right]" /></li>
      </ul>

      <h3>Backpropagation</h3>
      <p>
        <ConceptLink conceptId="backpropagation">Backpropagation</ConceptLink> is the algorithm
        that computes the gradient of the loss with respect to every weight in the network. It
        applies the chain rule of calculus, working backward from the output layer to the input layer.
        For each weight <MathBlock tex="w" />, we compute{' '}
        <MathBlock tex="\frac{\partial L}{\partial w}" />.
      </p>

      <h3>Gradient Descent</h3>
      <p>
        <ConceptLink conceptId="gradient-descent">Gradient descent</ConceptLink> updates each weight
        in the direction that reduces the loss:
      </p>
      <MathBlock tex="w \leftarrow w - \alpha \frac{\partial L}{\partial w}" display />
      <p>
        where <MathBlock tex="\alpha" /> is the{' '}
        <ConceptLink conceptId="learning-rate">learning rate</ConceptLink>. If{' '}
        <MathBlock tex="\alpha" /> is too large, training oscillates and may diverge. If too small,
        training is painfully slow. In practice, <strong>mini-batch stochastic gradient descent
        (SGD)</strong> computes gradients on small random subsets of the data, and adaptive
        optimizers like Adam adjust the learning rate per parameter.
      </p>

      <ExpandableReading title="Deep Dive: The Chain Rule in Backpropagation">
        <p>
          Consider a simple two-layer network: input <MathBlock tex="x" />, hidden layer output{' '}
          <MathBlock tex="h = \sigma(w_1 x + b_1)" />, and final output{' '}
          <MathBlock tex="\hat{y} = w_2 h + b_2" />. The loss is <MathBlock tex="L = (\hat{y} - y)^2" />.
        </p>
        <p>
          To update <MathBlock tex="w_1" />, we need <MathBlock tex="\frac{\partial L}{\partial w_1}" />.
          By the chain rule:
        </p>
        <MathBlock tex="\frac{\partial L}{\partial w_1} = \frac{\partial L}{\partial \hat{y}} \cdot \frac{\partial \hat{y}}{\partial h} \cdot \frac{\partial h}{\partial w_1}" display />
        <p>
          Each factor is easy to compute individually. Backpropagation simply organizes this
          chain-rule computation efficiently across many layers, reusing intermediate results.
          This is why it takes roughly the same time as a forward pass — not exponentially more.
        </p>
      </ExpandableReading>

      {/* === Regularization === */}
      <h2>Regularization</h2>
      <p>
        Neural networks have many parameters and are prone to{' '}
        <ConceptLink conceptId="overfitting">overfitting</ConceptLink> — memorizing the training
        data rather than learning generalizable patterns. Key{' '}
        <ConceptLink conceptId="regularization">regularization</ConceptLink> techniques include:
      </p>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li><strong>L2 regularization (weight decay):</strong> Adds <MathBlock tex="\lambda \sum w_i^2" /> to the loss, penalizing large weights and encouraging smoother functions.</li>
        <li><strong>L1 regularization:</strong> Adds <MathBlock tex="\lambda \sum |w_i|" />, encouraging sparsity (driving some weights to exactly zero).</li>
        <li><strong>Early stopping:</strong> Monitor performance on a validation set and stop training when validation loss starts increasing, even if training loss is still decreasing.</li>
        <li><strong><ConceptLink conceptId="dropout">Dropout</ConceptLink>:</strong> Randomly set a fraction of neuron outputs to zero during training, forcing the network to learn redundant representations. This is covered in detail in the next chapter.</li>
      </ul>

      {/* === Decision Scenario === */}
      <DecisionScenario
        scenario="You want to predict customer lifetime value (CLV) from 20 features including purchase history, demographics, and engagement metrics. You have 100,000 labeled records. Should you use a neural network or a traditional model?"
        choices={[
          {
            label: "Logistic regression / linear regression",
            explanation: "For predicting CLV, a linear model is a strong baseline. It is interpretable — you can explain to stakeholders which features drive CLV. With 20 features and 100K records, a linear model is unlikely to underfit. Start here and only move to a neural network if the linear model's accuracy is clearly insufficient.",
            isRecommended: true,
          },
          {
            label: "A 3-layer neural network with ReLU",
            explanation: "A neural network can capture nonlinear interactions between features, which might improve prediction. However, it is less interpretable, more prone to overfitting, requires more tuning (learning rate, architecture, regularization), and training is slower. It's a reasonable second step if the linear model plateaus, but jumping straight to a neural network bypasses a simpler solution.",
            isRecommended: false,
          },
          {
            label: "A 10-layer deep neural network",
            explanation: "With only 20 features and 100K records, a deep network is overkill. Deep networks shine on high-dimensional unstructured data (images, text, audio) where they can learn hierarchical representations. For tabular data with relatively few features, deep networks often perform no better than gradient-boosted trees or even linear models, while being much harder to train and interpret.",
            isRecommended: false,
          },
        ]}
      />

      {/* === Key Takeaways === */}
      <KeyTakeaways items={[
        "A neural network is a composition of simple units (perceptrons) — each computes a weighted sum, adds a bias, and applies a nonlinear activation function.",
        "ReLU is the default activation for hidden layers because it avoids the vanishing gradient problem that plagues sigmoid and tanh in deep networks.",
        "Backpropagation efficiently computes gradients via the chain rule, enabling gradient descent to update millions of parameters.",
        "For tabular business data, start with a linear model or gradient-boosted trees — neural networks add value primarily when the data is high-dimensional and unstructured (images, text, sequences).",
      ]} />

      {/* === Quiz === */}
      <QuizSection chapterId="ch11" />
    </ChapterLayout>
  )
}
