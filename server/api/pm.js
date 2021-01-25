import {ESSAYURL} from "../common/AjaxURLSchema"


/**
 * 
 *
 * @param {*} data
 * @returns
 */
export function addEssay(data) {
    return request({
        url: ESSAYURL,
        method: 'post',
        data
    })
}
export default {
    // 
    // @param: cb 返回的数据
    getSliderImg(calb){
        fetch(indexURL).then(res=> {
            res.json().then(data => {
                calb(data)
            })
        })
    },
}

export{
    addEssay,
}