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
        const change_icon = document.createElement('img')
        const image = document.createElement('img')

        inner_block.classList.add('inner_block')
        title.classList.add('span_styling')
        desciption.classList.add('p_styling')
        change_icon.classList.add('change_icon')
        image.classList.add('delete-button')
        image.classList.add('icon')
        inner_block.draggable = true

        inner_block.setAttribute('id', item.id);
        console.log(inner_block);
        change_icon.setAttribute('src', '/icons/edit.svg')
        change_icon.setAttribute('alt', 'edit svg')
        image.setAttribute('src', '/images/trash_icon.png')
        image.setAttribute('alt', 'trash icon')

        title.innerHTML = item.title
        desciption.innerHTML = item.desciption

        inner_block.append(title, desciption, change_icon)
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
        };

        image.ondragenter = (event: DragEvent) => {
            event.preventDefault();
        };

        image.ondrop = (event: DragEvent) => {
            event.preventDefault();
            const element = document.elementFromPoint(event.clientX, event.clientY) as HTMLElement;
            
            if (element) {
                const blockToRemove = element;
                blockToRemove.remove();

                deleteData(`/todos/${item.id}`)
                    .then((res: any) => {
                        if (res.status === 200 || res.status === 201) {
                            inner_block.remove()
                            console.log(res);
                        }
                    })
            }
        };

        change_icon.addEventListener("dblclick", function() {
            document.querySelector('.popup_2')?.classList.add('active');
        });

        document.querySelector('.popup_2 .close-btn_2')?.addEventListener('click', function() {
            document.querySelector('.popup_2')?.classList.remove('active')
        })
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
