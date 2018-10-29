# Deploy GTFS Realtime using Serverless

Simple Lambda function using Serverless Framework to decode GTFS protocol buffers as JSON content.

General Transit Feed Specification (GTFS) is a standardized format for public transit schedules and geographic information. GTFS Realtime provides realtime information about disruptions to transit service, vehicle location and expected arrival times [(http://gtfs.org)](http://gtfs.org/realtime/).

**Run Locally**

`node_modules/.bin/serverless offline start`

**Point your browser to:**

`http://localhost:3000/`

**You will see JSON output of the GTFS Realtime Protobuf:**

![GTFS Realtime output](https://nodalscapes.files.wordpress.com/2018/10/gtfs-realtime.png)

## Deploy to AWS Lambda using Serverless

Yan Cui has a great [article](https://hackernoon.com/using-protocol-buffers-with-api-gateway-and-aws-lambda-22c3804f3e76) about deploying to AWS Lambda using Mac OSX. Since the Lambda environment is run on Linux, the node module package binaries installed on your OSX machine will not work on AWS.

Check out the article above and the associated [git repo](https://github.com/theburningmonk/lambda-protobuf-demo) for more info.

The method uses a Docker container to deploy the Serverless package to AWS lambda

This is how I managed to make it work:

**Get the AWS Linux image:**

`docker pull amazonlinux`

**Run the container:**

`docker run -d -i -t amazonlinux`

**Finally, run docker-compose**:

`docker-compose up`

The `docker-compose up` command will reference the `docker-compose.yml` file, mounting volumes and setting the working directory and then finally run the shell command `deploy.sh`.
