{{/*
Basic labels for kubernetes and helm.
Also includes custom namespaced labels with Valienta specific labels
*/}}
{{- define "basicLabels" -}}
{{- $componentFullName := printf "%s-%s-%s" .Values.app .Values.component .Values.type -}}
helm.sh/chart: {{ printf "%s-%s" .Chart.Name .Chart.Version }}
app.kubernetes.io/name: {{ $componentFullName | quote }}
app.kubernetes.io/managed-by: {{ .Release.Service | quote }}
app.kubernetes.io/instance: {{ .Release.Name | quote }}
app.kubernetes.io/version: {{ .Values.componentVersion | quote }}
app.kubernetes.io/component: {{ .Values.component | quote }}
app.kubernetes.io/part-of: {{ .Values.app | quote }}
valienta.com/app: {{ .Values.app | quote }}
valienta.com/component: {{ .Values.component | quote }}
valienta.com/type: {{ .Values.type | quote }}
valienta.com/componentFullName: {{ $componentFullName | quote }}
valienta.com/version: {{ .Values.componentVersion | quote }}
valienta.com/environment: {{ .Values.environmentName | quote }}
{{- end -}}

{{/*
Pod selectors for replica sets, deployments and services
*/}}
{{- define "componentPodSelectors" -}}
{{- $componentFullName := printf "%s-%s-%s" .Values.app .Values.component .Values.type -}}
valienta.com/app: {{ .Values.app | quote }}
valienta.com/component: {{ .Values.component | quote }}
valienta.com/type: {{ .Values.type | quote }}
valienta.com/componentFullName: {{ $componentFullName | quote }}
valienta.com/environment: {{ .Values.environmentName | quote }}
{{- end -}}
