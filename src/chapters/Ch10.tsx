import { ChapterLayout } from '../components/content/ChapterLayout'
import { ConceptLink } from '../components/tooltip/ConceptLink'
import { MathBlock } from '../components/content/MathBlock'
import { ExpandableReading } from '../components/content/ExpandableReading'
import { KeyTakeaways } from '../components/content/KeyTakeaways'
import { DecisionScenario } from '../components/content/DecisionScenario'
import { QuizSection } from '../components/content/QuizSection'
import { CodeBlock } from '../components/content/CodeBlock'
import { codeExamples } from '../data/codeExamples'
import { TFIDFExplorer } from '../components/widgets/TFIDFExplorer'

export default function Ch10() {
  return (
    <ChapterLayout title="Chapter 10: Text Mining & NLP" subtitle="Transforming unstructured text into structured, analyzable data">
      {/* === Learning Objectives === */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg">
        <h3 className="font-semibold text-blue-800 dark:text-blue-200">Learning Objectives</h3>
        <ul className="list-disc list-inside text-sm text-blue-700 dark:text-blue-300 mt-2 space-y-1">
          <li>Understand the text preprocessing pipeline: tokenization, stemming, lemmatization, and stop word removal</li>
          <li>Represent text numerically using Bag of Words and TF-IDF weighting</li>
          <li>Apply sentiment analysis to classify text by polarity</li>
          <li>Use Latent Dirichlet Allocation (LDA) for topic modeling</li>
          <li>Measure document similarity using cosine similarity</li>
          <li>Identify appropriate text mining techniques for business applications</li>
        </ul>
      </div>

      {/* === Text as Data === */}
      <h2>Text as Data</h2>
      <p>
        Text is one of the richest and most abundant sources of data in business: customer reviews,
        support tickets, social media posts, emails, and contracts. But unlike the numerical data
        used in <ConceptLink conceptId="ols">regression</ConceptLink> or{' '}
        <ConceptLink conceptId="k-means">clustering</ConceptLink>, text is <em>unstructured</em> —
        it has no fixed columns or predefined format.
      </p>
      <p>
        <strong>Text mining</strong> (also called text analytics) is the process of transforming
        unstructured text into structured data that quantitative models can use. The broader field
        of <strong>Natural Language Processing (NLP)</strong> encompasses both text mining and more
        advanced techniques like machine translation, question answering, and text generation.
      </p>
      <p>
        The central challenge of text mining is <strong>representation</strong>: how do we convert
        a sequence of words into a numerical vector that a model can process while preserving
        the meaning?
      </p>

      {/* === Text Preprocessing Pipeline === */}
      <h2>Text Preprocessing Pipeline</h2>
      <p>
        Before any analysis, raw text must be cleaned and normalized. The standard preprocessing
        pipeline involves several steps:
      </p>

      <h3>Tokenization</h3>
      <p>
        <ConceptLink conceptId="tokenization">Tokenization</ConceptLink> splits a text document
        into individual units called <strong>tokens</strong>, typically words or sub-words.
        For example, the sentence "The model's accuracy is 95%" might be tokenized into:
        ["The", "model", "'s", "accuracy", "is", "95", "%"].
      </p>

      <h3>Stop Word Removal</h3>
      <p>
        <ConceptLink conceptId="stop-words">Stop words</ConceptLink> are common words like "the",
        "is", "at", and "which" that appear in nearly every document and carry little
        discriminative meaning. Removing them reduces dimensionality and focuses the analysis on
        content-bearing words. However, be cautious: in some contexts (e.g., sentiment analysis),
        words like "not" or "very" are critical.
      </p>

      <h3>Stemming and Lemmatization</h3>
      <p>
        <ConceptLink conceptId="stemming">Stemming</ConceptLink> reduces words to their root form
        by stripping suffixes. For example, "running", "runs", and "ran" all become "run" (or
        sometimes "runn"). It is fast but can be aggressive — "university" and "universe" might
        both stem to "univers".
      </p>
      <p>
        <ConceptLink conceptId="lemmatization">Lemmatization</ConceptLink> uses a dictionary to
        map words to their proper base form (lemma). "Better" becomes "good", and "was" becomes
        "be". It is more accurate than stemming but slower and requires part-of-speech tagging.
      </p>

      <h3>N-Grams</h3>
      <p>
        Single words (unigrams) lose phrase-level meaning. <ConceptLink conceptId="n-gram">N-grams</ConceptLink>{' '}
        capture sequences of <MathBlock tex="n" /> consecutive words. For example, bigrams (n=2)
        from "not good at all" include "not good", "good at", "at all". Using bigrams or trigrams
        can capture negations and multi-word expressions that unigrams miss.
      </p>

      {/* === Bag of Words & TF-IDF === */}
      <h2>Text Representation: Bag of Words & TF-IDF</h2>
      <p>
        The <ConceptLink conceptId="bag-of-words">Bag of Words (BoW)</ConceptLink> model represents
        each document as a vector of word counts, ignoring word order. Given a vocabulary of{' '}
        <MathBlock tex="V" /> unique terms across all documents, each document becomes a{' '}
        <MathBlock tex="V" />-dimensional vector in a{' '}
        <ConceptLink conceptId="document-term-matrix">document-term matrix</ConceptLink>.
      </p>
      <p>
        A key limitation of raw word counts is that common words dominate. A word like "hotel"
        appearing 50 times in a travel review is not 50 times more informative than a word appearing
        once. <ConceptLink conceptId="tf-idf">TF-IDF</ConceptLink> (Term Frequency–Inverse Document
        Frequency) addresses this by weighting each term:
      </p>
      <MathBlock tex="\text{tfidf}(t, d) = \text{tf}(t, d) \times \log \frac{N}{\text{df}(t)}" display />
      <p>
        where <MathBlock tex="\text{tf}(t,d)" /> is the frequency of term <MathBlock tex="t" /> in
        document <MathBlock tex="d" />, <MathBlock tex="N" /> is the total number of documents,
        and <MathBlock tex="\text{df}(t)" /> is the number of documents containing term{' '}
        <MathBlock tex="t" />. Terms that are frequent in a specific document but rare across the
        corpus receive high TF-IDF scores, signaling that they are <em>distinctive</em> for that
        document.
      </p>

      <TFIDFExplorer />

      <ExpandableReading title="Deep Dive: Why the Log in IDF?">
        <p>
          Without the logarithm, a term appearing in only 1 out of 10,000 documents would receive
          an IDF weight of 10,000 — drowning out all other features. The logarithm compresses this
          to <MathBlock tex="\log(10{,}000) \approx 9.2" />, keeping rare terms important but not
          dominant. This is an example of a general principle: when a quantity spans several orders
          of magnitude, taking the log produces a more useful scale.
        </p>
        <p>
          Some variants add smoothing: <MathBlock tex="\log\frac{N+1}{\text{df}(t)+1} + 1" display />{' '}
          to prevent division by zero and reduce the impact of very rare terms.
        </p>
      </ExpandableReading>

      {/* === Sentiment Analysis === */}
      <h2>Sentiment Analysis</h2>
      <p>
        <ConceptLink conceptId="sentiment-analysis">Sentiment analysis</ConceptLink> classifies
        text into categories of expressed opinion — most commonly positive, negative, or neutral.
        There are two main approaches:
      </p>
      <p>
        <strong>Lexicon-based methods</strong> use predefined dictionaries of words with associated
        sentiment scores (e.g., "excellent" = +3, "terrible" = –3). The sentiment of a document is
        the aggregate score. This approach is simple, transparent, and requires no training data,
        but it misses context: "not bad" should be positive, but a lexicon scores "not" and "bad"
        separately.
      </p>
      <p>
        <strong>Machine learning methods</strong> train a classifier (e.g.,{' '}
        <ConceptLink conceptId="logistic-regression">logistic regression</ConceptLink>,{' '}
        <ConceptLink conceptId="naive-bayes">Naive Bayes</ConceptLink>, or a neural network) on
        labeled examples. These models can learn contextual patterns but require labeled training
        data and may not generalize across domains.
      </p>

      {/* === Topic Modeling === */}
      <h2>Topic Modeling with LDA</h2>
      <p>
        When faced with thousands of documents, we often want to discover the main <em>themes</em>{' '}
        without reading every document. <ConceptLink conceptId="lda-topic-model">Latent Dirichlet
        Allocation (LDA)</ConceptLink> is a generative probabilistic model that discovers hidden
        topics in a corpus.
      </p>
      <p>
        LDA assumes each document is a mixture of topics, and each topic is a distribution over
        words. For example, in a corpus of business news:
      </p>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li><strong>Topic 1</strong> (Finance): "revenue", "profit", "quarter", "earnings"</li>
        <li><strong>Topic 2</strong> (Tech): "algorithm", "data", "platform", "cloud"</li>
        <li><strong>Topic 3</strong> (HR): "employee", "culture", "hiring", "remote"</li>
      </ul>
      <p>
        A single document might be 60% Topic 1, 30% Topic 2, and 10% Topic 3. LDA uses an
        iterative algorithm (typically Gibbs sampling or variational inference) to infer these
        topic mixtures from the observed word co-occurrence patterns.
      </p>

      {/* === Document Similarity === */}
      <h2>Document Similarity</h2>
      <p>
        Once documents are represented as TF-IDF vectors, we can measure how similar two documents
        are using <ConceptLink conceptId="cosine-similarity">cosine similarity</ConceptLink>:
      </p>
      <MathBlock tex="\cos(\theta) = \frac{\mathbf{A} \cdot \mathbf{B}}{\|\mathbf{A}\| \, \|\mathbf{B}\|}" display />
      <p>
        Cosine similarity ranges from 0 (completely different) to 1 (identical direction in the
        vector space). It is preferred over{' '}
        <ConceptLink conceptId="euclidean-distance">Euclidean distance</ConceptLink> for text
        because it is <em>length-invariant</em>: a short review and a long review about the same
        topic will have similar cosine similarity even though their Euclidean distance is large
        (due to different total word counts).
      </p>
      <p>
        Applications include document retrieval (find reviews similar to a query), plagiarism
        detection, and recommendation systems.
      </p>

      {/* === Decision Scenario === */}
      <DecisionScenario
        scenario="A hotel chain receives 50,000 customer reviews per month and wants to understand recurring complaints. They have no labeled data. Which text mining approach should they start with?"
        choices={[
          {
            label: "Keyword matching with predefined complaint categories",
            explanation: "Keyword matching is fast and easy to implement, but it will miss synonyms, misspellings, and novel complaint types. It assumes you already know what customers are complaining about, which defeats the purpose of discovery. It's a reasonable first filter but not a comprehensive solution.",
            isRecommended: false,
          },
          {
            label: "LDA topic modeling on preprocessed reviews",
            explanation: "LDA is ideal for this use case: it discovers themes in unlabeled text at scale. After preprocessing and running LDA with 10–20 topics, the hotel chain can examine the top words per topic to identify complaint categories they might not have anticipated — e.g., 'wifi speed' or 'check-in wait time'. This is the right starting point for exploratory analysis.",
            isRecommended: true,
          },
          {
            label: "Train a sentiment classifier using star ratings as labels",
            explanation: "Sentiment analysis tells you whether reviews are positive or negative but not what specifically customers are talking about. Star ratings could serve as a proxy label, but this approach answers 'how do customers feel?' rather than 'what are they complaining about?' It could complement topic modeling but should not replace it for complaint discovery.",
            isRecommended: false,
          },
        ]}
      />

      {/* === Key Takeaways === */}
      <KeyTakeaways items={[
        "Text preprocessing (tokenization, stemming/lemmatization, stop word removal) is essential before any text analysis — garbage in, garbage out applies doubly to unstructured data.",
        "TF-IDF improves on raw word counts by upweighting terms that are distinctive to a document and downweighting universally common terms.",
        "LDA topic modeling is the go-to method for discovering themes in a large unlabeled corpus — it reveals structure you didn't know to look for.",
        "Cosine similarity is preferred over Euclidean distance for comparing text documents because it is invariant to document length.",
      ]} />

      {/* === Quiz === */}
      <h2>Code Example</h2>
      <CodeBlock python={codeExamples.ch10.python} r={codeExamples.ch10.r} title={codeExamples.ch10.title} />

      <QuizSection chapterId="ch10" />
    </ChapterLayout>
  )
}
