terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.95"
    }
  }

  backend "s3" {
    bucket = "iraelie-terraform-state-2026"
    key = "prod/ec2/terraform.tfstate"
    region = "us-east-1"
    encrypt = true
    use_lockfile = true
  }

}

provider "aws" {
  region = var.aws_region
}

