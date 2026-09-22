module "eks" {
  source = "terraform-aws-modules/eks/aws"
  version = "~> 20.0"

  cluster_name = var.cluster_name
  cluster_version = "1.32"

  vpc_id = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets
  cluster_endpoint_public_access = true

  create_kms_key            = false
  cluster_encryption_config = {}

  cluster_enabled_log_types = []
  
  eks_managed_node_groups = {
    default = {
      instance_types = [var.node_instance_type]
      min_size = 1
      max_size = 3
      desired_size = var.desired_nodes
    }
  }
}