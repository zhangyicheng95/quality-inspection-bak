import { fetchGet, fetchPost, fetchPut, fetchDelete, upload } from '@/services/fetch';
import { parseParamsToUrl } from '@/utils/utils';
import _ from 'lodash';

// 获取检测结果
export async function getResult(ip?: any) {
  return fetchGet(`/result`);
}