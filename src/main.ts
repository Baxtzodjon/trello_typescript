import { v4 as uuidv4 } from 'uuid';
import { getData, postData } from './modules/http';
import { reloadTasks } from './modules/ui';
const form = document.forms.namedItem("add_task") as HTMLFormElement;
// const places: any = document.querySelectorAll('.empty .col')
const places: any = document.querySelectorAll('.first_box')

//
// let todos: object = []
let todos: any = []
let temp: any = []
let temp_id: any

console.log(todos);
//

form.onsubmit = (event: Event) => {
  event.preventDefault()

  const fm = new FormData(form);

  const todo = {
    id: uuidv4(),
    title: fm.get('title'),
    desciption: fm.get('description'),
    status: fm.get('status'),
    created_at: new Date().toLocaleDateString('uz-UZ', { hour12: false })
  }

  console.log(todo);

  const { title, desciption, status } = todo

  if (!title || !desciption || !status) return

  postData('/todos', todo)
    .then((res: any) => {
      if (res.status === 200 || res.status === 201) {
        getData('/todos')
          .then((res: any) => {
            if (res.status === 200 || res.status === 201) {
              reloadTasks({ arr: res.data, places })
            }
          })
      }
    })
}

// temp.forEach((item?: any) => {
//   if (item && item.id === temp_id) {
//     temp.append(item);
//   }
// });

temp.forEach((item: any) => {
  item.addEventListener('dragstart', dragStart)
  item.addEventListener('dragend', dragEnd)
})

for (let empty of places) {
  empty.addEventListener('dragover', dragOver)
  empty.addEventListener('dragenter', dragEnter)
  empty.addEventListener('dragleave', dragLeave)
  empty.addEventListener('drop', dragDrop)
}

function dragStart(this: HTMLElement) {
  console.log('dragStart');
  temp_id = this.id;
  this.classList.add('hold');
  setTimeout(() => (this.className = 'invisible'), 0);
}

function dragEnd(this: HTMLElement) {
  console.log('dragEnd');
  this.className = 'fill';
}

function dragOver(event: DragEvent) {
  event.preventDefault();
}

function dragEnter(this: HTMLElement, event: DragEvent) {
  console.log('dragEnter');
  event.preventDefault();
  this.classList.add('hovered');
}

function dragLeave(this: HTMLElement) {
  console.log('dragLeave');
  this.className = 'first_box';
}

function dragDrop(this: HTMLElement) {
  console.log('dragDrop');
  this.className = 'first_box';
  todos.forEach((item:any) => {
      if (item.id === temp_id) {
        this.append(item);
      }
  });
}

const arrow: NodeListOf<Element> = document.querySelectorAll('.arrow');
const sidebar: HTMLElement | null = document.querySelector('.sidebar');
const chocolate_menu: HTMLElement | null = document.querySelector('.chocolate_menu');
const sidebarBtn: HTMLElement | null = document.querySelector('.bx-chevron-left');

arrow.forEach((arrowItem: Element) => {
  arrowItem.addEventListener("click", (e: Event) => {
    const arrowParent = (e.target as Element).parentElement?.parentElement;
    if (arrowParent) {
      arrowParent.classList.toggle('showMenu');
    }
  });
});

if (chocolate_menu) {
  chocolate_menu.addEventListener("click", () => {
    sidebar?.classList.toggle('close');
  });
}

if (sidebarBtn) {
  sidebarBtn.addEventListener("click", () => {
    sidebar?.classList.toggle('close');
  });
}

function createPopup(open: string): () => void {
  const popupNode: HTMLElement | null = document.querySelector(open);
  if (!popupNode) {
    return () => { };
  }

  const overlay: HTMLElement | null = popupNode.querySelector('.overlay');
  const closeBtn: HTMLElement | null = popupNode.querySelector('.close-btn');

  function openPopup() {
    popupNode?.classList.add('active')
    // popupNode.classList.add('active) 
  }

  function closePopup() {
    popupNode?.classList.remove('active')
  }

  if (overlay instanceof HTMLElement) {
    overlay.addEventListener('click', closePopup);
  }

  if (closeBtn instanceof HTMLElement) {
    closeBtn.addEventListener('click', closePopup);
  }

  return openPopup as () => void;
}

const popup = createPopup('#popup');
const openPopupBtn: HTMLElement | null = document.querySelector('#open-popup');
if (openPopupBtn) {
  openPopupBtn.addEventListener('click', popup);
}