import { TreeNode } from 'primeng/api';

export interface NodeEvent {
    node: TreeNode<string[]>;
    originalEvent: any;
}
