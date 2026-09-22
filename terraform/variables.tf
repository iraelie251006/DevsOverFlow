variable "aws_region" {
  default = "us-east-1"
}

variable "cluster_name" {
  default = "devflow-cluster"
}

variable "node_instance_type" {
  default = "t3.small"
}

variable "desired_nodes" {
  default = 2
}