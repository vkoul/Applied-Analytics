import { ChapterLayout } from '../components/content/ChapterLayout'
import { ConceptLink } from '../components/tooltip/ConceptLink'
import { MathBlock } from '../components/content/MathBlock'
import { ExpandableReading } from '../components/content/ExpandableReading'
import { KeyTakeaways } from '../components/content/KeyTakeaways'
import { DecisionScenario } from '../components/content/DecisionScenario'
import { QuizSection } from '../components/content/QuizSection'
import { KMeansStepThrough } from '../components/widgets/KMeansStepThrough'

export default function Ch9() {
  return (
    <ChapterLayout title="Chapter 9: Clustering Methods" subtitle="Unsupervised learning for discovering hidden structure in data">
      {/* === Learning Objectives === */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg">
        <h3 className="font-semibold text-blue-800 dark:text-blue-200">Learning Objectives</h3>
        <ul className="list-disc list-inside text-sm text-blue-700 dark:text-blue-300 mt-2 space-y-1">
          <li>Distinguish supervised from unsupervised learning and identify when clustering is appropriate</li>
          <li>Implement and interpret the K-means clustering algorithm</li>
          <li>Select an appropriate number of clusters using the elbow method and silhouette analysis</li>
          <li>Apply hierarchical clustering with different linkage criteria and interpret dendrograms</li>
          <li>Understand density-based clustering with DBSCAN and when it outperforms K-means</li>
          <li>Compare clustering methods and choose the right one for a given business problem</li>
        </ul>
      </div>

      {/* === Unsupervised Learning Overview === */}
      <h2>Unsupervised Learning Overview</h2>
      <p>
        All of the models we have covered so far — from <ConceptLink conceptId="ols">OLS regression</ConceptLink> to{' '}
        <ConceptLink conceptId="logistic-regression">logistic regression</ConceptLink> — are{' '}
        <em>supervised</em> learning methods: they require a labeled outcome variable{' '}
        <MathBlock tex="y" /> that we are trying to predict. In many business settings, however, we
        have no outcome variable. Instead, we want to discover <em>structure</em> in the data itself.
      </p>
      <p>
        <ConceptLink conceptId="unsupervised-learning">Unsupervised learning</ConceptLink> methods
        analyze data without predefined labels. The most common family of unsupervised methods is{' '}
        <strong>clustering</strong>, whose goal is to partition observations into groups (clusters)
        such that observations within a cluster are more similar to one another than to observations
        in other clusters.
      </p>
      <p>
        Clustering is widely used in business analytics for <strong>customer segmentation</strong>,
        market research, anomaly detection, and feature engineering. The key challenge is that
        there is no "correct answer" — we evaluate clusters by internal coherence and business
        usefulness rather than prediction accuracy.
      </p>

      {/* === K-Means Clustering === */}
      <h2>K-Means Clustering</h2>
      <p>
        <ConceptLink conceptId="k-means">K-means</ConceptLink> is the most widely used clustering
        algorithm. It partitions <MathBlock tex="n" /> observations into <MathBlock tex="K" />{' '}
        clusters by minimizing the total within-cluster sum of squares (WCSS):
      </p>
      <MathBlock tex="\min_{C_1,\ldots,C_K} \sum_{k=1}^{K} \sum_{x_i \in C_k} \|x_i - \mu_k\|^2" display />
      <p>
        where <MathBlock tex="\mu_k" /> is the <ConceptLink conceptId="centroid">centroid</ConceptLink>{' '}
        (mean) of cluster <MathBlock tex="C_k" />.
      </p>

      <h3>The Algorithm</h3>
      <p>K-means proceeds iteratively:</p>
      <ol className="list-decimal list-inside space-y-2 ml-4">
        <li><strong>Initialize:</strong> Randomly select <MathBlock tex="K" /> initial centroids (or use K-means++ for smarter initialization).</li>
        <li><strong>Assign:</strong> Assign each observation to the nearest centroid using <ConceptLink conceptId="euclidean-distance">Euclidean distance</ConceptLink>.</li>
        <li><strong>Update:</strong> Recalculate each centroid as the mean of all observations assigned to it.</li>
        <li><strong>Repeat:</strong> Iterate steps 2–3 until assignments stop changing (convergence).</li>
      </ol>
      <p>
        The algorithm is guaranteed to converge, but it may converge to a <em>local</em> minimum.
        In practice, we run K-means multiple times with different random initializations and keep
        the result with the lowest WCSS.
      </p>

      <h3>Choosing K: The Elbow Method and Silhouette Analysis</h3>
      <p>
        K-means requires us to specify <MathBlock tex="K" /> in advance — but how do we know the
        right number of clusters? Two common approaches help:
      </p>
      <p>
        The <ConceptLink conceptId="elbow-method">elbow method</ConceptLink> plots WCSS against{' '}
        <MathBlock tex="K" /> for <MathBlock tex="K = 1, 2, \ldots" />. As <MathBlock tex="K" />{' '}
        increases, WCSS always decreases. We look for an "elbow" — a point where the rate of
        decrease sharply changes — and select the <MathBlock tex="K" /> at the bend.
      </p>
      <p>
        The <ConceptLink conceptId="silhouette-score">silhouette score</ConceptLink> measures how
        similar an observation is to its own cluster compared to neighboring clusters:
      </p>
      <MathBlock tex="s(i) = \frac{b(i) - a(i)}{\max(a(i),\; b(i))}" display />
      <p>
        where <MathBlock tex="a(i)" /> is the mean distance from observation <MathBlock tex="i" />{' '}
        to other members of its cluster, and <MathBlock tex="b(i)" /> is the mean distance to
        members of the nearest neighboring cluster. Values range from –1 to 1, where higher is better.
        We choose the <MathBlock tex="K" /> that maximizes the average silhouette score.
      </p>

      <KMeansStepThrough />

      <ExpandableReading title="Deep Dive: K-Means++ Initialization">
        <p>
          Standard K-means picks initial centroids uniformly at random, which can lead to poor
          convergence. <strong>K-means++</strong> improves this by choosing initial centroids that
          are spread apart:
        </p>
        <ol className="list-decimal list-inside space-y-1 ml-4 text-sm">
          <li>Choose the first centroid uniformly at random from the data points.</li>
          <li>For each remaining data point <MathBlock tex="x" />, compute the distance <MathBlock tex="D(x)" /> to the nearest already-chosen centroid.</li>
          <li>Choose the next centroid with probability proportional to <MathBlock tex="D(x)^2" />.</li>
          <li>Repeat until all <MathBlock tex="K" /> centroids are chosen.</li>
        </ol>
        <p>
          This initialization is <MathBlock tex="O(\log K)" />-competitive with the optimal
          clustering and is the default in most software implementations.
        </p>
      </ExpandableReading>

      {/* === Hierarchical Clustering === */}
      <h2>Hierarchical Clustering</h2>
      <p>
        <ConceptLink conceptId="hierarchical-clustering">Hierarchical clustering</ConceptLink> builds
        a tree-like structure (a <ConceptLink conceptId="dendrogram">dendrogram</ConceptLink>) that
        shows nested groupings at every level of granularity. Unlike K-means, it does not require
        specifying <MathBlock tex="K" /> in advance.
      </p>
      <p>
        The most common variant is <strong>agglomerative</strong> (bottom-up) clustering:
      </p>
      <ol className="list-decimal list-inside space-y-2 ml-4">
        <li>Start with each observation as its own cluster (<MathBlock tex="n" /> clusters).</li>
        <li>Find the two closest clusters and merge them.</li>
        <li>Repeat until all observations belong to a single cluster.</li>
      </ol>

      <h3>Linkage Methods</h3>
      <p>
        "Closest" depends on how we define the distance between two clusters. The choice of
        <strong> linkage method</strong> has a large effect on the resulting clusters:
      </p>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li><strong>Single linkage:</strong> Distance between the two <em>closest</em> points in each cluster. Tends to produce elongated, chain-like clusters.</li>
        <li><strong>Complete linkage:</strong> Distance between the two <em>farthest</em> points. Produces compact, roughly equal-sized clusters.</li>
        <li><strong>Average linkage:</strong> Average distance between all pairs of points across the two clusters. A balanced compromise.</li>
        <li><strong><ConceptLink conceptId="ward-linkage">Ward's linkage</ConceptLink>:</strong> Merges the pair that results in the minimum increase in total within-cluster variance. Tends to produce compact, spherical clusters similar to K-means.</li>
      </ul>

      <h3>Interpreting Dendrograms</h3>
      <p>
        A <ConceptLink conceptId="dendrogram">dendrogram</ConceptLink> displays the full hierarchy
        of merges. The vertical axis shows the distance (or dissimilarity) at which each merge
        occurs. To obtain <MathBlock tex="K" /> clusters, we "cut" the dendrogram at a height
        that produces <MathBlock tex="K" /> branches. Large gaps in the dendrogram suggest natural
        cluster boundaries.
      </p>

      {/* === DBSCAN === */}
      <h2>DBSCAN: Density-Based Clustering</h2>
      <p>
        <ConceptLink conceptId="dbscan">DBSCAN</ConceptLink> (Density-Based Spatial Clustering of
        Applications with Noise) takes a fundamentally different approach: instead of partitioning
        all points, it identifies dense regions separated by sparser areas.
      </p>
      <p>
        DBSCAN requires two parameters:
      </p>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li><MathBlock tex="\varepsilon" /> <strong>(epsilon):</strong> The radius of the neighborhood around each point.</li>
        <li><strong>minPts:</strong> The minimum number of points required to form a dense region (core point).</li>
      </ul>
      <p>
        A point is a <strong>core point</strong> if it has at least minPts neighbors within distance{' '}
        <MathBlock tex="\varepsilon" />. Points reachable from core points form a cluster. Points
        not reachable from any core point are labeled as <strong>noise</strong> (outliers).
      </p>
      <p>
        Key advantages over K-means: DBSCAN can find clusters of <em>arbitrary shape</em>, does not
        require specifying <MathBlock tex="K" />, and naturally identifies outliers. Its main
        limitation is sensitivity to the choice of <MathBlock tex="\varepsilon" /> and minPts,
        especially when clusters have varying densities.
      </p>

      {/* === Comparing Methods === */}
      <h2>Comparing Clustering Methods</h2>
      <p>
        No single clustering algorithm is universally best. The choice depends on the data
        characteristics and the business question:
      </p>
      <div className="overflow-x-auto my-4">
        <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800">
              <th className="px-3 py-2 text-left font-medium">Method</th>
              <th className="px-3 py-2 text-left font-medium">Cluster Shape</th>
              <th className="px-3 py-2 text-left font-medium">Requires K?</th>
              <th className="px-3 py-2 text-left font-medium">Handles Noise?</th>
              <th className="px-3 py-2 text-left font-medium">Scalability</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr><td className="px-3 py-2">K-Means</td><td className="px-3 py-2">Spherical</td><td className="px-3 py-2">Yes</td><td className="px-3 py-2">No</td><td className="px-3 py-2">Excellent</td></tr>
            <tr><td className="px-3 py-2">Hierarchical</td><td className="px-3 py-2">Flexible</td><td className="px-3 py-2">No (cut later)</td><td className="px-3 py-2">No</td><td className="px-3 py-2">Poor for large n</td></tr>
            <tr><td className="px-3 py-2">DBSCAN</td><td className="px-3 py-2">Arbitrary</td><td className="px-3 py-2">No</td><td className="px-3 py-2">Yes</td><td className="px-3 py-2">Good</td></tr>
          </tbody>
        </table>
      </div>

      {/* === Decision Scenario === */}
      <DecisionScenario
        scenario="You are segmenting an e-commerce company's customer base for targeted marketing. You have purchase frequency, average order value, and recency data for 500,000 customers. Some customers are extreme outliers (bots or bulk resellers). Which clustering approach should you use?"
        choices={[
          {
            label: "K-Means with K chosen by the elbow method",
            explanation: "K-means is a strong choice here given the large dataset size and roughly spherical customer segments. However, you should first remove or flag the outlier customers, as K-means is sensitive to extreme values and will distort centroids. After cleaning, K-means scales well to 500K observations.",
            isRecommended: true,
          },
          {
            label: "Hierarchical clustering with Ward's linkage",
            explanation: "While hierarchical clustering produces an informative dendrogram, its O(n²) memory and O(n³) time complexity make it impractical for 500,000 observations. It would be appropriate for a smaller sample or for exploring structure in a subsample before applying K-means to the full dataset.",
            isRecommended: false,
          },
          {
            label: "DBSCAN with tuned epsilon",
            explanation: "DBSCAN would naturally handle the outlier customers (labeling them as noise), which is a real advantage. However, customer segments typically have varying densities — high-value customers are sparse, budget customers are dense — and DBSCAN struggles with clusters of different densities. It may merge the dense segments or miss the sparse ones.",
            isRecommended: false,
          },
        ]}
      />

      {/* === Key Takeaways === */}
      <KeyTakeaways items={[
        "K-means is fast and effective for large datasets with roughly spherical clusters, but you must specify K and it is sensitive to outliers and initialization.",
        "Hierarchical clustering reveals nested structure through dendrograms and does not require pre-specifying K, but it scales poorly beyond a few thousand observations.",
        "DBSCAN finds clusters of arbitrary shape and naturally identifies outliers, but it struggles with clusters of varying density.",
        "Always standardize (or normalize) your features before clustering — variables on different scales will dominate the distance calculations.",
      ]} />

      {/* === Quiz === */}
      <QuizSection chapterId="ch9" />
    </ChapterLayout>
  )
}
