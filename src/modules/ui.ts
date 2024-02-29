import { deleteData, patchData } from "./http";

type Task = {
    id: string;
    title: string;
    desciption: string;
    status: number;
}

type reloadTaskProps = {
    arr: Task[];
    places: HTMLElement[];
}

export function reloadTasks({ arr, places }: reloadTaskProps): void {
    places.forEach((el) => (el.innerHTML = ""));

    for (let item of arr) {
        const inner_block = document.createElement('div')
        const title = document.createElement('span')
        const desciption = document.createElement('p')
        const image = document.createElement('img')

        inner_block.classList.add('inner_block')
        title.classList.add('span_styling')
        desciption.classList.add('p_styling')
        image.classList.add('delete-button')
        inner_block.draggable = true

        inner_block.setAttribute('id', item.id);
        console.log(inner_block);
        image.setAttribute('src', '/images/trash_icon.png')
        image.setAttribute('alt', 'trash icon')

        title.innerHTML = item.title
        desciption.innerHTML = item.desciption

        inner_block.append(title, desciption)
        places[item.status].append(inner_block)
        document.body.append(image)


        inner_block.ondragstart = function() {
            inner_block.classList.add('hold');
            setTimeout(() => {inner_block.className = 'invisible'}, 0);

            if (ondragstart) {
                image.style.display = 'none'
            } else {
                image.style.display = 'block'
            }
        };

        inner_block.ondragend = () => {
            inner_block.className = 'inner_block' // fill

            if (ondragend) {
                image.style.display = 'block'
            } else {
                image.style.display = 'none'
            }
        };

        image.ondragover = (event: DragEvent) => {
            event.preventDefault();
            const element = document.elementFromPoint(event.clientX, event.clientY) as HTMLElement;
            
            if (element) {
                const blockToRemove = element;
                blockToRemove.remove();

                deleteData(`/todos/${item.id}`)
                    .then(res => {
                        console.log(res);
                    })
            }
        }; 
    }
}

export function setDragDrop(places: any) {
    for (let item of places) {
        item.ondragover = (event: DragEvent) => {
            event.preventDefault();
        };

        item.ondragenter = (event: DragEvent) => {
            event.preventDefault();
            item.classList.add('hovered');
        };
        
        item.ondragleave = () => {
            item.className = 'first_box';
        };

        item.ondrop = () => {
            item.className = 'first_box';
            let selectedCard: HTMLElement | null = document.querySelector('.invisible');
            if (selectedCard) {
                let id: string | null = selectedCard.getAttribute('id') || null;
                item.append(selectedCard);
                
                const path: string = `/todos/${id}`;
                
                patchData(path, {status: item.dataset.status})
                    .then(res => console.log(res))
            }
        };
    }
}
