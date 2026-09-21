terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "6.65.0"
    }
  }

  backend "s3" {
    bucket = "my-terraform-state-bucket"
    key = "prod/ec2/terraform.tfstate"
    region = "us-east-1"
    encrypt = true
    dynamodb_table = "terraform-state-lock"
  }

}

provider "aws" {
  region = var.aws_region
}

