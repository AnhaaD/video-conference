const tile_canvas = {
    '1': ['span 12/span 24'],
    '2': ['span 12/span 12/13/25', 'span 12/span 12/13/13'],
    '3': ['span 6/span 12', 'span 6/span 12', 'span 6/span 12/7/19'],
    '4': ['span 6/span 12', 'span 6/span 12', 'span 6/span 12', 'span 6/span 12/7/13'],
    '5': ['span 3/span 4/13/9', 'span 3/span 4/13/13', 'span 3/span 4/13/17', 'span 3/span 4/13/21', 'span 9/span 16/10/21'], 
    '6': ['span 3/span 4/13/7', 'span 3/span 4/13/11', 'span 3/span 4/13/15', 'span 3/span 4/13/19', 'span 3/span 4/13/23', 'span 9/span 16/10/21'],
    '7': ['span 3/span 4/13/5', 'span 3/span 4/13/9', 'span 3/span 4/13/13', 'span 3/span 4/13/17', 'span 3/span 4/13/21', 'span 3/span 4/13/25', 'span 9/span 16/10/21'], 
}

exports.customRender = function(streamList) {
    const canvas = document.querySelector('#ag-canvas')

    let no = streamList.length
    // no more than 7 people
    if (no>7) {
        return
    }

    streamList.map((item, index) => {
        let id = item.getId()
        let dom = document.querySelector('#ag-item-'+id)
        if (!dom) {
            dom = document.createElement('section')
            dom.setAttribute('id', 'ag-item-'+id)
            dom.setAttribute('class', 'ag-item')
            canvas.appendChild(dom)
            item.play('ag-item-'+id);

        } else {
            // if (item.isPlaying()) {
            //     item.stop();
            // }
        }
        dom.setAttribute('style', `grid-area: ${tile_canvas[no][index]};`)
    })
}

// export {
//    customRender
// }