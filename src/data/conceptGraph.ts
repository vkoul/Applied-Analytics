export interface ConceptNode {
  id: string
  prerequisites: string[]
  chapterOrigin: string
  category: string
}

export const conceptGraph: Record<string, ConceptNode> = {
  // Statistics fundamentals
  'regression': { id: 'regression', prerequisites: [], chapterOrigin: 'ch1', category: 'foundations' },
  'cross-sectional-data': { id: 'cross-sectional-data', prerequisites: [], chapterOrigin: 'ch1', category: 'foundations' },
  'time-series-data': { id: 'time-series-data', prerequisites: [], chapterOrigin: 'ch1', category: 'foundations' },
  'panel-data': { id: 'panel-data', prerequisites: ['cross-sectional-data', 'time-series-data'], chapterOrigin: 'ch1', category: 'foundations' },
  'generalized-linear-model': { id: 'generalized-linear-model', prerequisites: ['regression', 'mle', 'link-function'], chapterOrigin: 'ch1', category: 'foundations' },

  // Linear models
  'ols': { id: 'ols', prerequisites: ['regression'], chapterOrigin: 'ch2', category: 'linear' },
  'r-squared': { id: 'r-squared', prerequisites: ['ols', 'residuals'], chapterOrigin: 'ch2', category: 'linear' },
  'adjusted-r-squared': { id: 'adjusted-r-squared', prerequisites: ['r-squared'], chapterOrigin: 'ch2', category: 'linear' },
  'residuals': { id: 'residuals', prerequisites: ['ols'], chapterOrigin: 'ch2', category: 'linear' },
  'heteroscedasticity': { id: 'heteroscedasticity', prerequisites: ['residuals', 'ols'], chapterOrigin: 'ch2', category: 'linear' },
  'multicollinearity': { id: 'multicollinearity', prerequisites: ['ols'], chapterOrigin: 'ch2', category: 'linear' },
  'vif': { id: 'vif', prerequisites: ['multicollinearity', 'r-squared'], chapterOrigin: 'ch2', category: 'linear' },
  'aic-bic': { id: 'aic-bic', prerequisites: ['mle'], chapterOrigin: 'ch2', category: 'linear' },
  'f-test': { id: 'f-test', prerequisites: ['ols', 'r-squared'], chapterOrigin: 'ch2', category: 'linear' },
  'gauss-markov': { id: 'gauss-markov', prerequisites: ['ols', 'heteroscedasticity'], chapterOrigin: 'ch2', category: 'linear' },
  'dummy-variable': { id: 'dummy-variable', prerequisites: ['ols'], chapterOrigin: 'ch2', category: 'linear' },

  // Binary response
  'logistic-regression': { id: 'logistic-regression', prerequisites: ['mle', 'sigmoid-function', 'link-function'], chapterOrigin: 'ch3', category: 'binary' },
  'probit-model': { id: 'probit-model', prerequisites: ['mle', 'link-function'], chapterOrigin: 'ch3', category: 'binary' },
  'mle': { id: 'mle', prerequisites: [], chapterOrigin: 'ch3', category: 'estimation' },
  'odds-ratio': { id: 'odds-ratio', prerequisites: ['logistic-regression', 'log-odds'], chapterOrigin: 'ch3', category: 'binary' },
  'confusion-matrix': { id: 'confusion-matrix', prerequisites: ['logistic-regression'], chapterOrigin: 'ch3', category: 'binary' },
  'roc-curve': { id: 'roc-curve', prerequisites: ['confusion-matrix'], chapterOrigin: 'ch3', category: 'binary' },
  'auc': { id: 'auc', prerequisites: ['roc-curve'], chapterOrigin: 'ch3', category: 'binary' },
  'link-function': { id: 'link-function', prerequisites: ['regression'], chapterOrigin: 'ch3', category: 'foundations' },
  'sigmoid-function': { id: 'sigmoid-function', prerequisites: [], chapterOrigin: 'ch3', category: 'foundations' },
  'log-odds': { id: 'log-odds', prerequisites: [], chapterOrigin: 'ch3', category: 'binary' },

  // Censored data
  'censoring': { id: 'censoring', prerequisites: [], chapterOrigin: 'ch4', category: 'censored' },
  'truncation': { id: 'truncation', prerequisites: ['censoring'], chapterOrigin: 'ch4', category: 'censored' },
  'tobit-model': { id: 'tobit-model', prerequisites: ['mle', 'censoring', 'latent-variable'], chapterOrigin: 'ch4', category: 'censored' },
  'marginal-effects': { id: 'marginal-effects', prerequisites: ['mle'], chapterOrigin: 'ch4', category: 'estimation' },
  'latent-variable': { id: 'latent-variable', prerequisites: [], chapterOrigin: 'ch4', category: 'censored' },
  'selection-bias': { id: 'selection-bias', prerequisites: ['ols'], chapterOrigin: 'ch4', category: 'censored' },

  // Count data
  'poisson-distribution': { id: 'poisson-distribution', prerequisites: [], chapterOrigin: 'ch5', category: 'count' },
  'poisson-regression': { id: 'poisson-regression', prerequisites: ['poisson-distribution', 'mle', 'link-function'], chapterOrigin: 'ch5', category: 'count' },
  'overdispersion': { id: 'overdispersion', prerequisites: ['poisson-regression'], chapterOrigin: 'ch5', category: 'count' },
  'negative-binomial': { id: 'negative-binomial', prerequisites: ['overdispersion', 'poisson-regression'], chapterOrigin: 'ch5', category: 'count' },
  'zero-inflated-model': { id: 'zero-inflated-model', prerequisites: ['poisson-regression', 'logistic-regression'], chapterOrigin: 'ch5', category: 'count' },
  'incidence-rate-ratio': { id: 'incidence-rate-ratio', prerequisites: ['poisson-regression'], chapterOrigin: 'ch5', category: 'count' },
  'deviance': { id: 'deviance', prerequisites: ['mle'], chapterOrigin: 'ch5', category: 'count' },
  'dispersion-parameter': { id: 'dispersion-parameter', prerequisites: ['overdispersion'], chapterOrigin: 'ch5', category: 'count' },
  'exposure-offset': { id: 'exposure-offset', prerequisites: ['poisson-regression'], chapterOrigin: 'ch5', category: 'count' },

  // Survival
  'survival-function': { id: 'survival-function', prerequisites: [], chapterOrigin: 'ch6', category: 'survival' },
  'hazard-function': { id: 'hazard-function', prerequisites: ['survival-function'], chapterOrigin: 'ch6', category: 'survival' },
  'kaplan-meier': { id: 'kaplan-meier', prerequisites: ['survival-function', 'censoring'], chapterOrigin: 'ch6', category: 'survival' },
  'cox-model': { id: 'cox-model', prerequisites: ['hazard-function', 'mle'], chapterOrigin: 'ch6', category: 'survival' },
  'hazard-ratio': { id: 'hazard-ratio', prerequisites: ['cox-model'], chapterOrigin: 'ch6', category: 'survival' },
  'proportional-hazards': { id: 'proportional-hazards', prerequisites: ['cox-model'], chapterOrigin: 'ch6', category: 'survival' },
  'log-rank-test': { id: 'log-rank-test', prerequisites: ['kaplan-meier'], chapterOrigin: 'ch6', category: 'survival' },
  'weibull-distribution': { id: 'weibull-distribution', prerequisites: ['hazard-function'], chapterOrigin: 'ch6', category: 'survival' },
  'baseline-hazard': { id: 'baseline-hazard', prerequisites: ['cox-model'], chapterOrigin: 'ch6', category: 'survival' },

  // Discrete choice
  'multinomial-logit': { id: 'multinomial-logit', prerequisites: ['logistic-regression', 'utility-function'], chapterOrigin: 'ch7', category: 'choice' },
  'iia': { id: 'iia', prerequisites: ['multinomial-logit'], chapterOrigin: 'ch7', category: 'choice' },
  'nested-logit': { id: 'nested-logit', prerequisites: ['multinomial-logit', 'iia'], chapterOrigin: 'ch7', category: 'choice' },
  'mixed-logit': { id: 'mixed-logit', prerequisites: ['multinomial-logit'], chapterOrigin: 'ch7', category: 'choice' },
  'random-utility-model': { id: 'random-utility-model', prerequisites: ['utility-function'], chapterOrigin: 'ch7', category: 'choice' },
  'hausman-test': { id: 'hausman-test', prerequisites: ['ols', 'mle'], chapterOrigin: 'ch7', category: 'estimation' },
  'choice-probability': { id: 'choice-probability', prerequisites: ['multinomial-logit'], chapterOrigin: 'ch7', category: 'choice' },
  'utility-function': { id: 'utility-function', prerequisites: [], chapterOrigin: 'ch7', category: 'choice' },

  // IV
  'endogeneity': { id: 'endogeneity', prerequisites: ['ols'], chapterOrigin: 'ch8', category: 'iv' },
  'instrumental-variable': { id: 'instrumental-variable', prerequisites: ['endogeneity'], chapterOrigin: 'ch8', category: 'iv' },
  'two-stage-least-squares': { id: 'two-stage-least-squares', prerequisites: ['instrumental-variable', 'ols'], chapterOrigin: 'ch8', category: 'iv' },
  'omitted-variable-bias': { id: 'omitted-variable-bias', prerequisites: ['ols', 'endogeneity'], chapterOrigin: 'ch8', category: 'iv' },
  'exclusion-restriction': { id: 'exclusion-restriction', prerequisites: ['instrumental-variable'], chapterOrigin: 'ch8', category: 'iv' },
  'weak-instruments': { id: 'weak-instruments', prerequisites: ['instrumental-variable'], chapterOrigin: 'ch8', category: 'iv' },
  'first-stage': { id: 'first-stage', prerequisites: ['two-stage-least-squares'], chapterOrigin: 'ch8', category: 'iv' },
  'sargan-test': { id: 'sargan-test', prerequisites: ['two-stage-least-squares'], chapterOrigin: 'ch8', category: 'iv' },
  'consistency': { id: 'consistency', prerequisites: ['ols'], chapterOrigin: 'ch8', category: 'estimation' },

  // Clustering
  'unsupervised-learning': { id: 'unsupervised-learning', prerequisites: [], chapterOrigin: 'ch9', category: 'clustering' },
  'k-means': { id: 'k-means', prerequisites: ['unsupervised-learning', 'euclidean-distance'], chapterOrigin: 'ch9', category: 'clustering' },
  'hierarchical-clustering': { id: 'hierarchical-clustering', prerequisites: ['unsupervised-learning', 'euclidean-distance'], chapterOrigin: 'ch9', category: 'clustering' },
  'dbscan': { id: 'dbscan', prerequisites: ['unsupervised-learning', 'euclidean-distance'], chapterOrigin: 'ch9', category: 'clustering' },
  'silhouette-score': { id: 'silhouette-score', prerequisites: ['k-means'], chapterOrigin: 'ch9', category: 'clustering' },
  'euclidean-distance': { id: 'euclidean-distance', prerequisites: [], chapterOrigin: 'ch9', category: 'foundations' },
  'dendrogram': { id: 'dendrogram', prerequisites: ['hierarchical-clustering'], chapterOrigin: 'ch9', category: 'clustering' },
  'ward-linkage': { id: 'ward-linkage', prerequisites: ['hierarchical-clustering'], chapterOrigin: 'ch9', category: 'clustering' },
  'elbow-method': { id: 'elbow-method', prerequisites: ['k-means'], chapterOrigin: 'ch9', category: 'clustering' },
  'centroid': { id: 'centroid', prerequisites: ['k-means'], chapterOrigin: 'ch9', category: 'clustering' },

  // Text mining
  'tokenization': { id: 'tokenization', prerequisites: [], chapterOrigin: 'ch10', category: 'text' },
  'stemming': { id: 'stemming', prerequisites: ['tokenization'], chapterOrigin: 'ch10', category: 'text' },
  'lemmatization': { id: 'lemmatization', prerequisites: ['tokenization'], chapterOrigin: 'ch10', category: 'text' },
  'bag-of-words': { id: 'bag-of-words', prerequisites: ['tokenization'], chapterOrigin: 'ch10', category: 'text' },
  'tf-idf': { id: 'tf-idf', prerequisites: ['bag-of-words'], chapterOrigin: 'ch10', category: 'text' },
  'sentiment-analysis': { id: 'sentiment-analysis', prerequisites: ['bag-of-words'], chapterOrigin: 'ch10', category: 'text' },
  'lda-topic-model': { id: 'lda-topic-model', prerequisites: ['bag-of-words', 'mle'], chapterOrigin: 'ch10', category: 'text' },
  'cosine-similarity': { id: 'cosine-similarity', prerequisites: ['tf-idf'], chapterOrigin: 'ch10', category: 'text' },
  'n-gram': { id: 'n-gram', prerequisites: ['tokenization'], chapterOrigin: 'ch10', category: 'text' },
  'document-term-matrix': { id: 'document-term-matrix', prerequisites: ['bag-of-words'], chapterOrigin: 'ch10', category: 'text' },
  'stop-words': { id: 'stop-words', prerequisites: ['tokenization'], chapterOrigin: 'ch10', category: 'text' },

  // Neural networks
  'perceptron': { id: 'perceptron', prerequisites: ['regression'], chapterOrigin: 'ch11', category: 'neural' },
  'activation-function': { id: 'activation-function', prerequisites: ['perceptron'], chapterOrigin: 'ch11', category: 'neural' },
  'relu': { id: 'relu', prerequisites: ['activation-function'], chapterOrigin: 'ch11', category: 'neural' },
  'backpropagation': { id: 'backpropagation', prerequisites: ['gradient-descent', 'activation-function'], chapterOrigin: 'ch11', category: 'neural' },
  'gradient-descent': { id: 'gradient-descent', prerequisites: [], chapterOrigin: 'ch11', category: 'neural' },
  'learning-rate': { id: 'learning-rate', prerequisites: ['gradient-descent'], chapterOrigin: 'ch11', category: 'neural' },
  'loss-function': { id: 'loss-function', prerequisites: [], chapterOrigin: 'ch11', category: 'neural' },
  'cross-entropy': { id: 'cross-entropy', prerequisites: ['loss-function', 'logistic-regression'], chapterOrigin: 'ch11', category: 'neural' },
  'regularization': { id: 'regularization', prerequisites: ['overfitting'], chapterOrigin: 'ch11', category: 'neural' },
  'overfitting': { id: 'overfitting', prerequisites: ['ols'], chapterOrigin: 'ch11', category: 'foundations' },
  'universal-approximation': { id: 'universal-approximation', prerequisites: ['perceptron', 'activation-function'], chapterOrigin: 'ch11', category: 'neural' },

  // Deep learning
  'cnn': { id: 'cnn', prerequisites: ['backpropagation', 'convolution-layer'], chapterOrigin: 'ch12', category: 'deep' },
  'convolution-layer': { id: 'convolution-layer', prerequisites: ['perceptron'], chapterOrigin: 'ch12', category: 'deep' },
  'pooling-layer': { id: 'pooling-layer', prerequisites: ['convolution-layer'], chapterOrigin: 'ch12', category: 'deep' },
  'feature-map': { id: 'feature-map', prerequisites: ['convolution-layer'], chapterOrigin: 'ch12', category: 'deep' },
  'rnn': { id: 'rnn', prerequisites: ['backpropagation'], chapterOrigin: 'ch12', category: 'deep' },
  'vanishing-gradient': { id: 'vanishing-gradient', prerequisites: ['backpropagation', 'gradient-descent'], chapterOrigin: 'ch12', category: 'deep' },
  'lstm': { id: 'lstm', prerequisites: ['rnn', 'vanishing-gradient'], chapterOrigin: 'ch12', category: 'deep' },
  'dropout': { id: 'dropout', prerequisites: ['regularization', 'overfitting'], chapterOrigin: 'ch12', category: 'deep' },
  'batch-normalization': { id: 'batch-normalization', prerequisites: ['gradient-descent'], chapterOrigin: 'ch12', category: 'deep' },
  'transfer-learning': { id: 'transfer-learning', prerequisites: ['cnn'], chapterOrigin: 'ch12', category: 'deep' },
}

export function isDAG(): boolean {
  const visited = new Set<string>()
  const inStack = new Set<string>()

  function dfs(id: string): boolean {
    if (inStack.has(id)) return false
    if (visited.has(id)) return true
    visited.add(id)
    inStack.add(id)
    const node = conceptGraph[id]
    if (node) {
      for (const dep of node.prerequisites) {
        if (!dfs(dep)) return false
      }
    }
    inStack.delete(id)
    return true
  }

  for (const id of Object.keys(conceptGraph)) {
    if (!dfs(id)) return false
  }
  return true
}
