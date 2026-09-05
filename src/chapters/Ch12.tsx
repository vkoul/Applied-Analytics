import { ChapterLayout } from '../components/content/ChapterLayout'
import { ConceptLink } from '../components/tooltip/ConceptLink'
import { MathBlock } from '../components/content/MathBlock'
import { ExpandableReading } from '../components/content/ExpandableReading'
import { KeyTakeaways } from '../components/content/KeyTakeaways'
import { DecisionScenario } from '../components/content/DecisionScenario'
import { QuizSection } from '../components/content/QuizSection'
import { CodeBlock } from '../components/content/CodeBlock'
import { codeExamples } from '../data/codeExamples'
import { CNNFilterVisualizer } from '../components/widgets/CNNFilterVisualizer'

export default function Ch12() {
  return (
    <ChapterLayout title="Chapter 12: Deep Learning" subtitle="Convolutional and recurrent architectures for complex data">
      {/* === Learning Objectives === */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg">
        <h3 className="font-semibold text-blue-800 dark:text-blue-200">Learning Objectives</h3>
        <ul className="list-disc list-inside text-sm text-blue-700 dark:text-blue-300 mt-2 space-y-1">
          <li>Understand why deeper networks can learn richer representations than shallow ones</li>
          <li>Describe the architecture of Convolutional Neural Networks (CNNs) and their use for spatial data</li>
          <li>Explain Recurrent Neural Networks (RNNs) and the vanishing gradient problem for sequential data</li>
          <li>Understand LSTM architecture and how it addresses long-range dependencies</li>
          <li>Apply dropout and batch normalization as regularization and training stabilization techniques</li>
          <li>Leverage transfer learning to train effective models with limited labeled data</li>
        </ul>
      </div>

      {/* === From Shallow to Deep === */}
      <h2>From Shallow to Deep Networks</h2>
      <p>
        In the previous chapter, we saw that a single hidden layer network is a{' '}
        <ConceptLink conceptId="universal-approximation">universal approximator</ConceptLink>. So
        why go deeper? The answer is <strong>efficiency of representation</strong>.
      </p>
      <p>
        Deep networks learn <em>hierarchical features</em>: early layers detect simple patterns
        (edges, syllables, individual words), and later layers combine them into complex concepts
        (faces, sentences, sentiment). This hierarchical composition means that a deep network with{' '}
        <MathBlock tex="n" /> parameters per layer and <MathBlock tex="L" /> layers can represent
        functions that would require exponentially more parameters in a single layer.
      </p>
      <p>
        In practice, deep learning dominates tasks involving <strong>images</strong>,{' '}
        <strong>text</strong>, <strong>speech</strong>, and <strong>time series</strong> — domains
        where hierarchical structure is natural. For standard tabular data, gradient-boosted trees
        remain competitive.
      </p>

      {/* === CNNs === */}
      <h2>Convolutional Neural Networks (CNNs)</h2>
      <p>
        <ConceptLink conceptId="cnn">Convolutional Neural Networks</ConceptLink> are designed for
        data with spatial structure — primarily images, but also 1D signals and certain text
        representations. The key idea is <strong>parameter sharing</strong>: instead of learning
        a separate weight for every pixel, a CNN learns small filters that slide across the input.
      </p>

      <h3>Convolution Layers</h3>
      <p>
        A <ConceptLink conceptId="convolution-layer">convolution layer</ConceptLink> applies a set
        of learnable filters (kernels) to the input. Each filter is a small matrix (e.g.,{' '}
        <MathBlock tex="3 \times 3" />) that slides across the input, computing a dot product at
        each position:
      </p>
      <MathBlock tex="(f * g)(t) = \sum_{\tau} f(\tau)\, g(t - \tau)" display />
      <p>
        Each filter produces a <ConceptLink conceptId="feature-map">feature map</ConceptLink> —
        a 2D array that shows where and how strongly the filter's pattern appears in the input.
        Early layers learn simple features like edges and textures; deeper layers compose these
        into complex patterns like shapes and objects.
      </p>

      <h3>Pooling Layers</h3>
      <p>
        <ConceptLink conceptId="pooling-layer">Pooling layers</ConceptLink> reduce the spatial
        dimensions of feature maps, providing translation invariance and reducing computation.
        <strong> Max pooling</strong> (the most common) takes the maximum value in each local region
        (e.g., <MathBlock tex="2 \times 2" />), halving the spatial dimensions. This means a
        small shift in the input does not change the output — the network recognizes a cat whether
        it appears in the top-left or bottom-right of the image.
      </p>

      <h3>CNN Architecture Pattern</h3>
      <p>
        A typical CNN alternates convolution and pooling layers, progressively reducing spatial
        dimensions while increasing the number of feature maps (channels). The final feature maps
        are flattened into a vector and fed into one or more fully connected layers for
        classification or regression.
      </p>

      {/* === RNNs === */}
      <h2>Recurrent Neural Networks (RNNs)</h2>
      <p>
        While CNNs excel at spatial data, <ConceptLink conceptId="rnn">Recurrent Neural Networks
        (RNNs)</ConceptLink> are designed for <em>sequential</em> data: time series, text, speech,
        and any data where order matters.
      </p>
      <p>
        An RNN processes a sequence one step at a time, maintaining a <strong>hidden state</strong>{' '}
        <MathBlock tex="h_t" /> that acts as a "memory" of what the network has seen so far:
      </p>
      <MathBlock tex="h_t = f(W_h h_{t-1} + W_x x_t + b)" display />
      <p>
        At each time step <MathBlock tex="t" />, the hidden state depends on the current input{' '}
        <MathBlock tex="x_t" /> and the previous hidden state <MathBlock tex="h_{t-1}" />. This
        recurrence allows the network to capture temporal dependencies.
      </p>

      <h3>The Vanishing Gradient Problem</h3>
      <p>
        In theory, RNNs can model arbitrarily long dependencies. In practice, the{' '}
        <ConceptLink conceptId="vanishing-gradient">vanishing gradient problem</ConceptLink> makes
        them struggle with long sequences. During{' '}
        <ConceptLink conceptId="backpropagation">backpropagation through time</ConceptLink>,
        gradients are multiplied through many time steps. If the multiplication factor is less
        than 1, gradients shrink exponentially, and the network cannot learn from distant events.
      </p>

      {/* === LSTMs === */}
      <h2>LSTM: Long Short-Term Memory</h2>
      <p>
        <ConceptLink conceptId="lstm">LSTM</ConceptLink> networks solve the vanishing gradient
        problem by introducing a <strong>cell state</strong> — a highway that carries information
        across many time steps with minimal interference — and three <strong>gates</strong> that
        regulate information flow:
      </p>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li>
          <strong>Forget gate:</strong> Decides what information to discard from the cell state.{' '}
          <MathBlock tex="f_t = \sigma(W_f \cdot [h_{t-1}, x_t] + b_f)" />
        </li>
        <li>
          <strong>Input gate:</strong> Decides what new information to store in the cell state.{' '}
          <MathBlock tex="i_t = \sigma(W_i \cdot [h_{t-1}, x_t] + b_i)" />
        </li>
        <li>
          <strong>Output gate:</strong> Decides what part of the cell state to output.{' '}
          <MathBlock tex="o_t = \sigma(W_o \cdot [h_{t-1}, x_t] + b_o)" />
        </li>
      </ul>
      <p>
        The cell state is updated additively (not multiplicatively), which preserves gradients
        over long sequences. LSTMs can learn dependencies spanning hundreds of time steps.
      </p>

      <CNNFilterVisualizer />

      <ExpandableReading title="Deep Dive: Why Additive Updates Solve Vanishing Gradients">
        <p>
          In a standard RNN, the hidden state is computed as{' '}
          <MathBlock tex="h_t = \tanh(W h_{t-1} + \ldots)" />. When we backpropagate through{' '}
          <MathBlock tex="T" /> time steps, the gradient includes the product{' '}
          <MathBlock tex="\prod_{t=1}^{T} W^T \cdot \text{diag}(\tanh'(\ldots))" />. Since{' '}
          <MathBlock tex="|\tanh'(z)| \leq 1" />, this product shrinks exponentially.
        </p>
        <p>
          The LSTM cell state uses <em>additive</em> updates:{' '}
          <MathBlock tex="c_t = f_t \odot c_{t-1} + i_t \odot \tilde{c}_t" />. The gradient of{' '}
          <MathBlock tex="c_t" /> with respect to <MathBlock tex="c_{t-1}" /> is just{' '}
          <MathBlock tex="f_t" /> (an element-wise factor between 0 and 1), not a matrix product.
          As long as the forget gate stays near 1, information flows backward almost unchanged.
        </p>
      </ExpandableReading>

      {/* === Dropout and Batch Normalization === */}
      <h2>Regularization and Training Techniques</h2>

      <h3>Dropout</h3>
      <p>
        <ConceptLink conceptId="dropout">Dropout</ConceptLink> randomly sets a fraction{' '}
        <MathBlock tex="p" /> of neuron activations to zero during each training step:
      </p>
      <MathBlock tex="\hat{y} = f(W \cdot (m \odot x) + b), \quad m_i \sim \text{Bernoulli}(p)" display />
      <p>
        This prevents neurons from co-adapting — each neuron must learn to be useful independently,
        because it cannot rely on specific other neurons being present. At test time, all neurons
        are active but their outputs are scaled by <MathBlock tex="p" /> to compensate. Typical
        dropout rates are 0.2–0.5.
      </p>

      <h3>Batch Normalization</h3>
      <p>
        <ConceptLink conceptId="batch-normalization">Batch normalization</ConceptLink> normalizes
        the inputs to each layer by subtracting the batch mean and dividing by the batch standard
        deviation. This stabilizes the distribution of inputs across layers during training,
        allowing higher learning rates and faster convergence. It also provides a mild regularizing
        effect.
      </p>

      {/* === Transfer Learning === */}
      <h2>Transfer Learning</h2>
      <p>
        Training a deep network from scratch requires massive datasets and computational resources.{' '}
        <ConceptLink conceptId="transfer-learning">Transfer learning</ConceptLink> leverages a
        model pre-trained on a large general dataset (e.g., ImageNet for images, Wikipedia for text)
        and <strong>fine-tunes</strong> it on a smaller, task-specific dataset.
      </p>
      <p>
        The typical workflow:
      </p>
      <ol className="list-decimal list-inside space-y-2 ml-4">
        <li>Take a pre-trained model and remove the final classification layer.</li>
        <li>Freeze the early layers (which capture general features).</li>
        <li>Add new layers for your specific task.</li>
        <li>Train only the new layers (and optionally fine-tune later layers) on your data.</li>
      </ol>
      <p>
        Transfer learning can achieve high accuracy with as few as a few hundred labeled examples
        — a dramatic reduction from the millions typically needed to train from scratch.
      </p>

      {/* === Decision Scenario === */}
      <DecisionScenario
        scenario="A manufacturer wants to automatically detect defective products on an assembly line using camera images. They have 2,000 labeled images (1,500 normal, 500 defective). Which approach should they use?"
        choices={[
          {
            label: "Traditional ML: extract hand-designed features, then classify with logistic regression",
            explanation: "Hand-designed features (e.g., edge counts, color histograms) can work for simple defects, but they require domain expertise to engineer and may miss subtle visual patterns. This approach is brittle — if the product or defect type changes, the features must be redesigned. It's the legacy approach that deep learning has largely replaced for image tasks.",
            isRecommended: false,
          },
          {
            label: "Train a CNN from scratch on the 2,000 images",
            explanation: "CNNs are the right architecture for image data, but 2,000 images is far too few to train a deep CNN from scratch. The model would severely overfit — memorizing the training images rather than learning generalizable defect patterns. Data augmentation (rotation, flipping, brightness) would help but likely not enough.",
            isRecommended: false,
          },
          {
            label: "Fine-tune a pre-trained CNN (e.g., ResNet) on the 2,000 images",
            explanation: "Transfer learning is the correct choice. A model pre-trained on ImageNet already knows how to detect edges, textures, and shapes — the general visual features relevant to defect detection. Fine-tuning the final layers on the 2,000 labeled images allows the model to specialize for this task. Combined with data augmentation, this can achieve high accuracy even with limited labeled data.",
            isRecommended: true,
          },
        ]}
      />

      {/* === Key Takeaways === */}
      <KeyTakeaways items={[
        "CNNs use parameter sharing (convolution filters) to efficiently process spatial data — they learn hierarchical visual features from edges to complex objects.",
        "RNNs process sequential data by maintaining a hidden state, but vanilla RNNs suffer from vanishing gradients; LSTMs solve this with gated additive cell-state updates.",
        "Dropout prevents co-adaptation of neurons during training, and batch normalization stabilizes layer inputs for faster, more stable learning.",
        "Transfer learning is often the most practical approach: pre-trained models provide powerful general features that can be fine-tuned with relatively little task-specific data.",
      ]} />

      {/* === Quiz === */}
      <h2>Code Example</h2>
      <CodeBlock python={codeExamples.ch12.python} r={codeExamples.ch12.r} title={codeExamples.ch12.title} />

      <QuizSection chapterId="ch12" />
    </ChapterLayout>
  )
}
