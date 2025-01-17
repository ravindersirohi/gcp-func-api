# gcp-func-api
Google Clourd Platform, cloud function to implement CI/CD via the Github action trigger.

## Descriptin

CI/CD pipelines integrated on GCP for Nodejs function (github-cloud-func) and calling a secured (secure-func) .NET 8 cloud run function.

## GCP permissions for CI/CD
To integrate Github or any other public devOps tool, list of permissions to be enabled on GCP, manually or via terraform. 

1. CI/CD Service Account required 'Cloud Functions Developer' or 'Cloud Functions Admin' role
2. Enable Cloud Function, Cloud Deploy and Cloud Build API on the Selected project.
3. Assigned 'Cloud Invoker' role on secureFunc service account.

## Terraform example
Please find below the [terraform](https://cloud.google.com/functions/docs/tutorials/terraform) example to provision a cloud function.

```
resource "google_storage_bucket_object" "object" {
  name   = "function-source.zip"
  bucket = google_storage_bucket.default.name
  source = data.archive_file.default.output_path # Add path to the zipped function source code
}

resource "google_cloudfunctions2_function" "default" {
  name        = "github-cloud-func"
  location    = "europe-west2"
  description = "Cloud function to call another secure funciton and deployed from Github"

  build_config {
    runtime     = "nodejs22"
    entry_point = "helloGithub" # Set the entry point
    source {
      storage_source {
        bucket = google_storage_bucket.default.name
        object = google_storage_bucket_object.object.name
      }
    }
  }

  service_config {
    max_instance_count = 1
    available_memory   = "256M"
    timeout_seconds    = 60
  }
}

```

## Additonal links

Please find below some useful links

- [Create a Google Cloud project](https://developers.google.com/workspace/guides/create-project) and try to use free credits if avilable.
- [Cloud run vs Cloud functions](https://cloud.google.com/blog/products/serverless/cloud-run-vs-cloud-functions-for-serverless) for serverless.
- [Cloud Functions is now Cloud Run functions](https://cloud.google.com/blog/products/serverless/google-cloud-functions-is-now-cloud-run-functions)
