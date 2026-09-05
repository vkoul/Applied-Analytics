export interface CodeExample {
  chapter: string
  title: string
  python: string
  r: string
}

export const codeExamples: Record<string, CodeExample> = {
  ch1: {
    chapter: 'ch1',
    title: 'Loading and Exploring Data',
    python: `import pandas as pd
import matplotlib.pyplot as plt

# Load data
df = pd.read_csv('data.csv')

# Summary statistics
print(df.describe())

# Correlation matrix
print(df.corr())

# Scatter plot matrix
pd.plotting.scatter_matrix(df[['x1', 'x2', 'y']], figsize=(8, 8))
plt.tight_layout()
plt.show()`,
    r: `library(tidyverse)

# Load data
df <- read_csv("data.csv")

# Summary statistics
summary(df)

# Correlation matrix
cor(df)

# Scatter plot matrix
pairs(df[, c("x1", "x2", "y")])`,
  },
  ch2: {
    chapter: 'ch2',
    title: 'OLS Regression with Diagnostics',
    python: `import statsmodels.api as sm
import statsmodels.stats.api as sms

# Fit OLS
X = sm.add_constant(df[['x1', 'x2']])
model = sm.OLS(df['y'], X).fit()
print(model.summary())

# VIF for multicollinearity
from statsmodels.stats.outliers_influence import variance_inflation_factor
vif = [variance_inflation_factor(X.values, i) for i in range(X.shape[1])]
print("VIF:", vif)

# Breusch-Pagan test for heteroscedasticity
bp_test = sms.het_breuschpagan(model.resid, X)
print(f"BP p-value: {bp_test[1]:.4f}")

# Robust standard errors
robust = model.get_robustcov_results(cov_type='HC3')
print(robust.summary())`,
    r: `# Fit OLS
model <- lm(y ~ x1 + x2, data = df)
summary(model)

# VIF for multicollinearity
library(car)
vif(model)

# Breusch-Pagan test
library(lmtest)
bptest(model)

# Robust standard errors
library(sandwich)
coeftest(model, vcov = vcovHC(model, type = "HC3"))`,
  },
  ch3: {
    chapter: 'ch3',
    title: 'Logistic Regression with ROC Curve',
    python: `import statsmodels.api as sm
from sklearn.metrics import roc_curve, roc_auc_score, confusion_matrix
import numpy as np

# Fit logistic regression
X = sm.add_constant(df[['x1', 'x2']])
logit = sm.Logit(df['y'], X).fit()
print(logit.summary())

# Odds ratios
print("Odds Ratios:", np.exp(logit.params))

# Predictions and confusion matrix
pred_prob = logit.predict(X)
pred_class = (pred_prob > 0.5).astype(int)
print(confusion_matrix(df['y'], pred_class))

# ROC curve
fpr, tpr, _ = roc_curve(df['y'], pred_prob)
print(f"AUC: {roc_auc_score(df['y'], pred_prob):.3f}")`,
    r: `# Fit logistic regression
logit <- glm(y ~ x1 + x2, data = df, family = binomial)
summary(logit)

# Odds ratios
exp(coef(logit))

# Predictions and confusion matrix
pred_prob <- predict(logit, type = "response")
pred_class <- ifelse(pred_prob > 0.5, 1, 0)
table(Actual = df$y, Predicted = pred_class)

# ROC curve
library(pROC)
roc_obj <- roc(df$y, pred_prob)
plot(roc_obj)
auc(roc_obj)`,
  },
  ch4: {
    chapter: 'ch4',
    title: 'Tobit Model for Censored Data',
    python: `import statsmodels.api as sm
import numpy as np
from scipy.optimize import minimize
from scipy.stats import norm

# OLS (biased for censored data)
X = sm.add_constant(df[['x1', 'x2']])
ols = sm.OLS(df['y'], X).fit()
print("OLS (biased):", ols.params.values)

# Tobit via manual MLE with scipy
def tobit_loglik(params, X, y):
    beta = params[:-1]
    sigma = np.exp(params[-1])
    xb = X @ beta
    ll = np.where(
        y > 0,
        norm.logpdf(y, xb, sigma),
        norm.logcdf(0, xb, sigma)
    )
    return -ll.sum()

x0 = np.append(ols.params.values, np.log(ols.resid.std()))
result = minimize(tobit_loglik, x0, args=(X.values, df['y'].values))
print("Tobit:", result.x[:-1])`,
    r: `library(AER)

# OLS (biased for censored data)
ols <- lm(y ~ x1 + x2, data = df)
summary(ols)

# Tobit model
tobit <- tobit(y ~ x1 + x2, data = df, left = 0)
summary(tobit)

# Compare coefficients
cbind(OLS = coef(ols), Tobit = coef(tobit))

# Marginal effects
library(mfx)
margins(tobit)`,
  },
  ch5: {
    chapter: 'ch5',
    title: 'Poisson and Negative Binomial Regression',
    python: `import statsmodels.api as sm
from statsmodels.discrete.count_model import ZeroInflatedPoisson

# Poisson regression
X = sm.add_constant(df[['x1', 'x2']])
poisson = sm.GLM(df['y'], X, family=sm.families.Poisson()).fit()
print(poisson.summary())

# Check overdispersion
resid_dev = poisson.deviance / poisson.df_resid
print(f"Deviance/df: {resid_dev:.2f} (>1 suggests overdispersion)")

# Negative binomial
nb = sm.GLM(df['y'], X, family=sm.families.NegativeBinomial()).fit()
print(nb.summary())

# Zero-inflated Poisson
zip_model = ZeroInflatedPoisson(df['y'], X, exog_infl=X).fit()
print(zip_model.summary())`,
    r: `library(MASS)
library(pscl)

# Poisson regression
poisson <- glm(y ~ x1 + x2, data = df, family = poisson)
summary(poisson)

# Check overdispersion
deviance(poisson) / df.residual(poisson)

# Negative binomial
nb <- glm.nb(y ~ x1 + x2, data = df)
summary(nb)

# Zero-inflated Poisson
zip <- zeroinfl(y ~ x1 + x2 | x1 + x2, data = df)
summary(zip)

# Vuong test: Poisson vs ZIP
vuong(poisson, zip)`,
  },
  ch6: {
    chapter: 'ch6',
    title: 'Survival Analysis: Kaplan-Meier and Cox PH',
    python: `from lifelines import KaplanMeierFitter, CoxPHFitter
from lifelines.statistics import logrank_test

# Kaplan-Meier
kmf = KaplanMeierFitter()
kmf.fit(df['time'], event_observed=df['event'])
kmf.plot_survival_function()

# Log-rank test between groups
group1 = df[df['treatment'] == 0]
group2 = df[df['treatment'] == 1]
result = logrank_test(group1['time'], group2['time'],
                      group1['event'], group2['event'])
print(f"Log-rank p-value: {result.p_value:.4f}")

# Cox Proportional Hazards
cph = CoxPHFitter()
cph.fit(df[['time', 'event', 'x1', 'x2']], 'time', 'event')
cph.print_summary()

# Hazard ratios
print("Hazard ratios:", cph.hazard_ratios_)`,
    r: `library(survival)
library(survminer)

# Kaplan-Meier
km <- survfit(Surv(time, event) ~ 1, data = df)
ggsurvplot(km, data = df)

# Log-rank test between groups
survdiff(Surv(time, event) ~ treatment, data = df)

# Cox Proportional Hazards
cox <- coxph(Surv(time, event) ~ x1 + x2, data = df)
summary(cox)

# Check PH assumption
cox.zph(cox)
plot(cox.zph(cox))`,
  },
  ch7: {
    chapter: 'ch7',
    title: 'Multinomial and Nested Logit',
    python: `import statsmodels.api as sm
from statsmodels.discrete.discrete_model import MNLogit

# Multinomial logit
X = sm.add_constant(df[['x1', 'x2']])
mnl = MNLogit(df['choice'], X).fit()
print(mnl.summary())

# Predicted probabilities
probs = mnl.predict(X)
print(probs.head())

# For nested logit, use pylogit
import pylogit as pl
# Define nesting structure and fit
# nested = pl.create_choice_model(data, ...)`,
    r: `library(mlogit)
library(nnet)

# Reshape data to long format for mlogit
ml_data <- mlogit.data(df, choice = "choice",
                        shape = "wide", varying = 3:6)

# Multinomial logit
mnl <- mlogit(choice ~ 1 | x1 + x2, data = ml_data)
summary(mnl)

# Hausman-McFadden IIA test
hmftest(mnl)

# Nested logit
nl <- mlogit(choice ~ 1 | x1 + x2, data = ml_data,
             nests = list(public = c("bus", "train"),
                          private = c("car")))
summary(nl)`,
  },
  ch8: {
    chapter: 'ch8',
    title: 'Two-Stage Least Squares (2SLS)',
    python: `from linearmodels.iv import IV2SLS
import statsmodels.api as sm

# OLS (biased under endogeneity)
X = sm.add_constant(df[['x_endog', 'x_exog']])
ols = sm.OLS(df['y'], X).fit()
print("OLS:", ols.params.values)

# 2SLS with instrument z
iv = IV2SLS(df['y'], df[['x_exog']], df[['x_endog']],
            df[['z']]).fit()
print(iv.summary)

# First-stage F-statistic
print(f"First-stage F: {iv.first_stage.diagnostics['x_endog']['f.stat']:.1f}")

# Hausman test (compare OLS vs IV)
from linearmodels.iv.diagnostics import wu_hausman
print(wu_hausman(iv))`,
    r: `library(AER)

# OLS (biased)
ols <- lm(y ~ x_endog + x_exog, data = df)

# 2SLS with instrument z
iv <- ivreg(y ~ x_endog + x_exog | z + x_exog, data = df)
summary(iv, diagnostics = TRUE)

# Compare OLS vs IV
cbind(OLS = coef(ols), IV = coef(iv))

# Hausman test
# The diagnostics = TRUE above includes
# Wu-Hausman and Sargan tests`,
  },
  ch9: {
    chapter: 'ch9',
    title: 'K-Means, Hierarchical, and DBSCAN Clustering',
    python: `from sklearn.cluster import KMeans, AgglomerativeClustering, DBSCAN
from sklearn.metrics import silhouette_score
from sklearn.preprocessing import StandardScaler

# Standardize features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(df[['x1', 'x2', 'x3']])

# K-Means with elbow method
inertias = []
for k in range(2, 11):
    km = KMeans(n_clusters=k, random_state=42).fit(X_scaled)
    inertias.append(km.inertia_)
# Plot inertias to find elbow

# Fit K-Means
km = KMeans(n_clusters=3, random_state=42).fit(X_scaled)
print(f"Silhouette: {silhouette_score(X_scaled, km.labels_):.3f}")

# Hierarchical
hc = AgglomerativeClustering(n_clusters=3, linkage='ward')
hc.fit(X_scaled)

# DBSCAN
db = DBSCAN(eps=0.5, min_samples=5).fit(X_scaled)
print(f"Clusters: {len(set(db.labels_)) - (1 if -1 in db.labels_ else 0)}")`,
    r: `library(factoextra)
library(dbscan)

# Standardize
X_scaled <- scale(df[, c("x1", "x2", "x3")])

# K-Means with elbow
fviz_nbclust(X_scaled, kmeans, method = "wss")

# Fit K-Means
km <- kmeans(X_scaled, centers = 3, nstart = 25)
fviz_cluster(km, data = X_scaled)

# Hierarchical (Ward's)
hc <- hclust(dist(X_scaled), method = "ward.D2")
plot(hc)  # dendrogram
cutree(hc, k = 3)

# DBSCAN
db <- dbscan(X_scaled, eps = 0.5, minPts = 5)
fviz_cluster(list(data = X_scaled, cluster = db$cluster))`,
  },
  ch10: {
    chapter: 'ch10',
    title: 'Text Mining: TF-IDF and LDA',
    python: `from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import LatentDirichletAllocation
from sklearn.feature_extraction.text import CountVectorizer

# TF-IDF
vectorizer = TfidfVectorizer(max_features=1000, stop_words='english')
tfidf_matrix = vectorizer.fit_transform(df['text'])
feature_names = vectorizer.get_feature_names_out()

# Top terms per document
for i in range(min(3, tfidf_matrix.shape[0])):
    row = tfidf_matrix[i].toarray().flatten()
    top_idx = row.argsort()[-5:][::-1]
    print(f"Doc {i}: {[feature_names[j] for j in top_idx]}")

# LDA topic modeling
cv = CountVectorizer(max_features=1000, stop_words='english')
dtm = cv.fit_transform(df['text'])
lda = LatentDirichletAllocation(n_components=5, random_state=42)
lda.fit(dtm)

# Top words per topic
for i, topic in enumerate(lda.components_):
    top_words = [cv.get_feature_names_out()[j] for j in topic.argsort()[-10:]]
    print(f"Topic {i}: {top_words}")`,
    r: `library(tidytext)
library(topicmodels)

# Tokenize and compute TF-IDF
tokens <- df %>%
  unnest_tokens(word, text) %>%
  anti_join(stop_words) %>%
  count(doc_id, word) %>%
  bind_tf_idf(word, doc_id, n)

# Top TF-IDF terms per document
tokens %>%
  group_by(doc_id) %>%
  slice_max(tf_idf, n = 5)

# Document-term matrix for LDA
dtm <- tokens %>%
  cast_dtm(doc_id, word, n)

# LDA topic model
lda <- LDA(dtm, k = 5, method = "Gibbs")
terms(lda, 10)  # top 10 words per topic

# Tidy LDA output
tidy(lda, matrix = "beta") %>%
  group_by(topic) %>%
  slice_max(beta, n = 10)`,
  },
  ch11: {
    chapter: 'ch11',
    title: 'Neural Network Classification',
    python: `from sklearn.neural_network import MLPClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt

# Prepare data
X = df[['x1', 'x2', 'x3']].values
y = df['y'].values
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Fit MLP
mlp = MLPClassifier(
    hidden_layer_sizes=(64, 32),
    activation='relu',
    max_iter=500,
    early_stopping=True,
    random_state=42
)
mlp.fit(X_train, y_train)

print(f"Train accuracy: {mlp.score(X_train, y_train):.3f}")
print(f"Test accuracy:  {mlp.score(X_test, y_test):.3f}")

# Learning curve
plt.plot(mlp.loss_curve_)
plt.xlabel('Iteration'); plt.ylabel('Loss')
plt.title('Training Loss Curve')`,
    r: `library(nnet)
library(caret)

# Train/test split
set.seed(42)
idx <- createDataPartition(df$y, p = 0.8, list = FALSE)
train <- df[idx, ]
test  <- df[-idx, ]

# Single hidden layer (nnet)
nn <- nnet(y ~ x1 + x2 + x3, data = train,
           size = 32, maxit = 500, decay = 0.01)
pred <- predict(nn, test, type = "class")
confusionMatrix(factor(pred), factor(test$y))

# For deeper networks, use keras
library(keras)
model <- keras_model_sequential() %>%
  layer_dense(64, activation = "relu", input_shape = 3) %>%
  layer_dense(32, activation = "relu") %>%
  layer_dense(1, activation = "sigmoid")

model %>% compile(loss = "binary_crossentropy",
                  optimizer = "adam", metrics = "accuracy")

history <- model %>% fit(
  as.matrix(train[, c("x1","x2","x3")]),
  train$y, epochs = 50, validation_split = 0.2
)
plot(history)`,
  },
  ch12: {
    chapter: 'ch12',
    title: 'CNN with Transfer Learning',
    python: `import tensorflow as tf
from tensorflow.keras import layers, models

# Simple CNN from scratch
model = models.Sequential([
    layers.Conv2D(32, (3,3), activation='relu', input_shape=(28,28,1)),
    layers.MaxPooling2D((2,2)),
    layers.Conv2D(64, (3,3), activation='relu'),
    layers.MaxPooling2D((2,2)),
    layers.Flatten(),
    layers.Dropout(0.5),
    layers.Dense(64, activation='relu'),
    layers.Dense(10, activation='softmax')
])

model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

# Transfer learning with pre-trained model
base_model = tf.keras.applications.MobileNetV2(
    weights='imagenet', include_top=False, input_shape=(224,224,3))
base_model.trainable = False  # freeze pre-trained layers

transfer_model = models.Sequential([
    base_model,
    layers.GlobalAveragePooling2D(),
    layers.Dropout(0.3),
    layers.Dense(10, activation='softmax')
])

transfer_model.compile(optimizer='adam',
                       loss='categorical_crossentropy',
                       metrics=['accuracy'])`,
    r: `library(keras)

# Simple CNN from scratch
model <- keras_model_sequential() %>%
  layer_conv_2d(32, c(3,3), activation = "relu",
                input_shape = c(28, 28, 1)) %>%
  layer_max_pooling_2d(c(2,2)) %>%
  layer_conv_2d(64, c(3,3), activation = "relu") %>%
  layer_max_pooling_2d(c(2,2)) %>%
  layer_flatten() %>%
  layer_dropout(0.5) %>%
  layer_dense(64, activation = "relu") %>%
  layer_dense(10, activation = "softmax")

model %>% compile(
  loss = "sparse_categorical_crossentropy",
  optimizer = "adam", metrics = "accuracy")

# Transfer learning
base_model <- application_mobilenet_v2(
  weights = "imagenet", include_top = FALSE,
  input_shape = c(224, 224, 3))
freeze_weights(base_model)

transfer_model <- keras_model_sequential() %>%
  base_model %>%
  layer_global_average_pooling_2d() %>%
  layer_dropout(0.3) %>%
  layer_dense(10, activation = "softmax")

transfer_model %>% compile(
  loss = "categorical_crossentropy",
  optimizer = "adam", metrics = "accuracy")`,
  },
}
