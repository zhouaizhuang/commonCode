/*
**********************************************************************************************
******************************************表单输入限制*********************************************
**********************************************************************************************
*/
export const gtEq0 = v => v.replace(/[^\d]/g,'') // 限制只能输入------->大于等于0的整数
export const cn = v => v.replace(/[^\u4e00-\u9fa5]/g,'') // 限制只能输入------->中文
export const en = v => v.replace(/[^a-zA-Z]/g,'') // 限制只能输入------->英文
export const num = v => v.replace(/\D/g,'') // 限制只能输入------->数字
export const num_dot = v => v.replace(/[^\d.]/g,'') // 限制只能输入------->数字 、 点
export const cn_num_en = v => v.replace(/[^\w\u4E00-\u9FA5]/g, '') // 限制只能输入------->中文、数字、英文
export const num_en_ = v => v.replace(/[^\w_]/g,'') // 限制只能输入------->英文、数字、下划线
export const az_num_ = v => v.replace(/[^a-z0-9_]/g,'') // 限制只能输入------->小写字母、数字、下划线
