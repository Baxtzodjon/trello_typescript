type Task = {
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
        places[item.status].innerHTML += `
        <div class="inner_block" draggable="true">
            <span class="span_styling">${item.title}</span>
            <p class="p_styling">${item.desciption}</p>
          </div>
        `;
    }
}
