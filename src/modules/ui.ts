import { patchData } from "./http";

type Task = {
    title: string;
    desciption: string;
    status: any; //number;
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

        inner_block.classList.add('inner_block')
        title.classList.add('span_styling')
        desciption.classList.add('p_styling')
        inner_block.draggable = true

        inner_block.setAttribute('id', item.status);
        console.log(inner_block);

        title.innerHTML = item.title
        desciption.innerHTML = item.desciption

        inner_block.append(title, desciption)
        places[item.status].append(inner_block)


        inner_block.ondragstart = () => function() {
            inner_block.classList.add('hold');
            setTimeout(() => (inner_block.className = 'invisible'), 0);
        };

        inner_block.ondragend = () => {
            inner_block.className = 'inner_block' // fill
        };

        // places[item.status].innerHTML += `
        // <div class="inner_block" draggable="true">
        //     <span class="span_styling">${item.title}</span>
        //     <p class="p_styling">${item.desciption}</p>
        //   </div>
        // `;
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

        // item.ondrop = () => {
        //     item.className = 'first_box';
        //     let selectedCard = document.querySelector('.inner_block')
        //     item.append(selectedCard)
        //     patchData
        // };

        // item.ondrop = () => {
        //     item.className = 'first_box';
        //     let selectedCard: any = document.querySelector('.inner_block')
        //     let status = selectedCard.getAttribute('data-status');
        //     item.append(selectedCard)
        
        //     const path = '/todos/id';
        //     const body = { status: status};
        //     patchData(path, body);
        // };

        // item.ondrop = () => {
        //     item.className = 'first_box';
        //     let selectedCard: any = document.querySelector('.inner_block');
        //     let status: string = selectedCard.getAttribute('id') || '';
        //     console.log(status);
        //     item.append(selectedCard);
        
        //     const taskId: string = selectedCard.dataset.id || '';
        //     const path: string = `/todos/${taskId}`;
        //     const body: { status: string } = { status: status };
        //     patchData(path, body);
        // };

        item.ondrop = () => {
            item.className = 'first_box';
            let selectedCard: HTMLElement | null = document.querySelector('.inner_block');
            if (selectedCard) {
                let status: string = selectedCard.getAttribute('id') || '';
                console.log(status);
                item.append(selectedCard);
        
                const taskId: string = selectedCard.dataset.id || '';
                console.log(taskId);
                
                const path: string = `/todos/$\{taskId\}`;
                const body: { status: string } = { status: status };
                patchData(path, body);
            }
        };
    }
}
