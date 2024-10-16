import type {InputProps} from 'antd';
import {Input} from 'antd';

export interface PipelineSearchProps extends InputProps {}

export function PipelineSearch(props: PipelineSearchProps) {
  return <Input placeholder="Tìm kiếm pipeline" {...props} />;
}
