# Kubernetes monitoring with Prometheus+Grafana

This is a guide for deploying Prometheus and Grafana using Helm

---

## Prerequisites

* Kubernetes cluster with access and sufficient priviligies
* `kubectl`
* `helm`

---

## Prometheus

1. Load the Helm repo:
```bash
$ helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
$ helm repo update
```

2. Install the Prometheus chart into the *monitoring* namespace:
```bash
$ helm install prometheus prometheus-community/prometheus \
  --namespace monitoring --create-namespace
```
**NOTE**: This will install Prometheus with default settings. For specific configuration, refer to the apporiate [documentation](https://prometheus.io/docs/prometheus/latest/configuration/configuration/).

3. Expose the Prometheus services using NodePort:
```bash
$ kubectl expose service prometheus-server --type=NodePort --target-port=9090 --name=prometheus-server-ext
```

4. Fetch the external adderess to the Prometheus UI:
```bash
$ kubectl get endpoints -n monitoring
```
---

## Grafana

1. Load the Helm repo:
```bash
$ helm repo add grafana https://grafana.github.io/helm-charts 
$ helm repo update
```

2. Install the Grafana chart into the *monitoring* namespace:
```bash
$ helm install grafana grafana/grafana \
  --namespace monitoring --create-namespace
```
**NOTE**: This will install Grafana with default settings. For specific configuration, refer to the apporiate [documentation](https://grafana.com/docs/grafana/latest/setup-grafana/configure-grafana/).

3. Expose the Grafana services using NodePort:
```bash
$ kubectl expose service grafana --type=NodePort --target-port=3000 --name=grafana-ext
```

4. Fetch the external adderess to the Grafana UI:
```bash
$ kubectl get endpoints -n monitoring
```

5. Fetch the Grafana admin password:
```bash
$ kubectl get secret --namespace default grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo
```

6. Navigate to the Grafana Login page and login as 'admin' and the password from the previous step.
7. Add the Prometheus instance as a data source:
* On the `Welcome to Grafana` Home page
* Select `Add your first data source`
* Select `Prometheus` as the data source
* Provide the Prometheus endpoint from the previous step in the URL box
* Save and Exit

---

## Dashboard configuraiton

1. Log in to the Grafana UI 
2. Navigate to `Dashboard` > `Add new panel`.
3. Enter a Prometheus query in the Metrics query field. For example:
   ```
   up
   ```
3. Configure visualization type as per your preference.
4. Save and Apply the dashboard.

---

