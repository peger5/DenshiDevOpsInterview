---
# Installing k3s on Windows 11 with WSL 

This is a guide to install k3s on a virtual Linux running on Windows 11 using WSL (Ubuntu).

## Prerequisites

When using 'Docker Desktop' it is important that the installation folder does not contain whitespaces. This means that the default *C:\_Program Files\_* DOES NOT WORK.

Reference [issue](https://stackoverflow.com/questions/76658490/why-run-k3s-server-on-win11-wsl2-errorfailed-to-start-containermanager-err-s)

To install Docker in a different location execute the following in a PowerShell with administartor priviligies:
```powershell
cd DOWNLOAD_DIRECTORY
Start-Process -Wait -FilePath ".\Docker Desktop Installer.exe" -ArgumentList "install -accept-license --installation-dir=C:\docker --wsl-default-data-root=C:\docker\WSL --windows-containers-default-data-root=C:\\docker\\WindowsContainers"
```


## Installing the cluster

Follow the quick-start [guide](https://docs.k3s.io/quick-start)
```bash 
$ curl -sfL https://get.k3s.io | sh -
```

## Post-install

Check the for errors
```bash
$ systemctl status k3s
$ less /var/log/syslog
```

Validate cluster access with *kubectl*
```bash
$ export KUBECONFIG=/etc/rancher/k3s/k3s.yaml
$ kubectl get nodes
```
