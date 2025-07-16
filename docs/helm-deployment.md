# Deploying TODO app via Helm

This is a guide on how to deploy the TODO app using the Helm chart.

## Prerequisites
* Kubernetes cluster with access and sufficient priviligies
* Access to the TODO app Helm chart
* `kubectl`
* `helm`

## Configuraiton
The configuration overrides are provided in a YAML file.

The following values can be configured.

### replicaCount
Controls the number of instances of the application
### image.repository
Sets the path to the image for the application
### image.tag
Sets the tag to the image for the application

### imagePullSecrets
Configure a pull secret for the image registry
### nameOverride
Overrides the instance name in Kubernetes resources
### fullnameOverride
Overrides the instance name in all resources
### serviceAccount.create
Boolean parameter to autogenerate a Service Account 
### podAnnotations
A List of annotations for all artifcacts
### podLabels
A List of labels for all artifacts

### service.type
The Service type - either NodePort of LoadBalancer is supported
### service.annotations
Custom annotations only for the Service artifact
### service.nodePort
Force a specific port when in NodePort mode

### nodeSelector
Node selector label settings
### tolerations:
Pod toleration settings
### affinity:
Pod affinity settings

## Installation
1. Navigate to the folder containing the TODO app Helm chart
2. Start the installation:
```bash
$ helm install RELEASE ./helm-chart -n NAMESPACE --create-namespace -f PATH/TO/VALUES
```
Example:
```bash
$ helm install todo-app ./helm-chart -n demo --create-namespace -f values-demo.yaml
```

## Uninstallation
1. Start the uninstallation:
```bash
$ helm uninstall RELEASE -n NAMESPACE
```
2. Confirm that the resources are removed:
```bash
$ kubectl get all -n NAMESPACE
```
3. Delete the namespace:
```bash
$ kubectl delete ns NAMESPACE
```
