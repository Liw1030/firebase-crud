<script>
    import {
        addDoc,
        doc,
        collection,
        onSnapshot,
        deleteDoc,
        updateDoc,
    } from "firebase/firestore";
    import { db } from "../firebase";
    import { onDestroy } from "svelte";

    // const isDarkMode = writable(false);

    // $: {
    //     if ($isDarkMode) {
    //         document.body.classList.add("dark");
    //         document.body.classList.remove("light");
    //     } else {
    //         document.body.classList.add("light");
    //         document.body.classList.remove("dark");
    //     }
    // } 

    let task = {
        task: "",
    };

    let tasks = [];
    let editStatus = false;
    let currentId = [];

    const addTask = async () => {
        try {
            await addDoc(collection(db, "tareas"), task);
            console.log("taks saved");
        } catch (error) {
            console.log(error);
        }
    };

    const updateTask = async () => {
        try {
            await updateDoc(doc(db, "tareas", currentId), task);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async () => {
        try {
            if (!editStatus) {
                addTask();
            } else {
                updateTask();
            }
        } catch (error) {
            console.log(error);
        }

        task = {
            task: "",
        };
        editStatus = false;
        currentId = "";
    };

    const deleteTask = async (id) => {
        await deleteDoc(doc(db, "tareas", id));
        console.log("deleted");
    };

    const editTask = (currentTask) => {
        currentTask.task = currentTask.task;
        currentId = currentTask.id;
        editStatus = true;
    };

    const unsub = onSnapshot(
        collection(db, "tareas"),
        (querySnapshot) => {
            tasks = querySnapshot.docs.map((doc) => {
                return { ...doc.data(), id: doc.id };
            });

            console.log(tasks);
        },
        (err) => {
            console.log(err);
        },
    );

    onDestroy(unsub);
</script>

<header>
    <h1>Todo</h1>
    <div class="theme-block">
        <input type="checkbox" id="theme"/>
        <label for="theme"></label>
    </div>
</header>

<main>
    <form  on:submit|preventDefault={handleSubmit}>
        <button class="add_button">Enviar</button>
        <input
            type="text"
            name="task"
            placeholder="Create new todo...."
            bind:value={task.task}
        />
    </form>
</main>

<section class="section1">
    {#each tasks as task}
        <div class="funtions">
        <label for="task" class="checkmark">Ok</label>
        <h5>{task.task}</h5>
        <div class="bts">
        <button class="delete" on:click={() => deleteTask(task.id)}>Delete</button>
        <button class="edit" on:click={() => editTask(task)}>Edit</button>
        </div>
        </div>
    {/each}
</section>

<footer>
    <h2>Hecho por Johana Usaquen - FrontendMentor</h2>
</footer>

<style>
    :root {
        --bag-top-image: url("/src/public/images/bg-desktop-dark.jpg");
        --main-bg: hsl(235, 21%, 11%);
        --todo-bg: hsl(235, 24%, 19%);
        --todo-shadow: hsl(235, 21%, 11%);
        --font-color: hsl(234, 39%, 85%);
        --font-color-hover: #fff;
        --button-bg: hsl(234, 13%, 28%);
        --main-bg-lg: hsl(0, 0%, 98%);
        --todo-bg-lg: hsl(0, 0%, 98%);
        --todo-shadow-lg: hsl(235, 9%, 61%);
        --font-color-lg: hsl(235, 9%, 61%);
        --font-color-hover-lg: hsl(235, 21%, 11%);
        --Orange: hsl(25, 97%, 53%);
        --White: hsl(0, 0%, 100%);
        --Light-Grey: hsl(217, 12%, 63%);
        --Dark-Blue: hsl(213, 19%, 18%);
        --Very-Dark-Blue: hsl(216, 12%, 8%);
    }

    :global(body) {
        transition:
            background-color 0.3s ease,
            color 0.3s ease;
        background-color: var(--main-bg);
        color: var(--font-color);
    }

    :global(.light) {
        background-color: var(--main-bg-lg);
        color: var(--font-color-lg);

        main {
            background: var(--todo-bg-lg);
            color: var(--font-color-lg);

            input {
                background: transparent;
                color: var(--font-color-lg);
            }
        }

        section.section1 {
            background: var(--todo-bg-lg);
            border: 1px solid var(--Light-Grey);
        }
    }

    header {
        display: flex;
        width: 100%;
        max-width: 545px;
        align-items: center;
        justify-content: space-between;
        margin: 50px 0 0;

        h1 {
            color: #fff;
        }
    }

    .theme-block {
        margin: -10px 0 0;
    }

    .theme-block #theme {
        display: none;
    }

    .theme-block #theme + label::before {
        content: "";
        background: url("../public/images/icon-moon.svg");
        display: block;
        width: 26px;
        height: 26px;
        cursor: pointer;
    }

    .theme-block #theme:checked + label::before {
        background: url("../public/images/icon-sun.svg");
    }

    main {
        display: flex;
        background: var(--todo-bg);
        width: 100%;
        max-width: 545px;
        padding-block: 20px;
        border-radius: 5px;
        margin: 30px 0 0;
    }

    .add_button {
    border: 1px solid var(--font-color);
    border-radius: 50px;
    background: transparent;
    color: transparent;
    width: 20px;
    cursor: pointer;
    margin: 0 15px 0 38px;
  }

  .add_button:hover {
    background:
      center url("../public/images/icon-check.svg") no-repeat,
      linear-gradient(135deg, hsl(192, 100%, 67%), hsl(200, 87%, 65%));
  }

    input {
        background: var(--todo-bg);
        border: none;
        padding: 0 10px;
        color: var(--font-color);
        outline: none;
    }

    section.section1 {
        display: flex;
        flex-direction: column;
        background: var(--todo-bg);
        width: 100%;
        max-width: 545px;
        margin-top: 40px;
        margin-bottom: 50px;
        border-radius: 5px;

    }

    .checkmark {
    border: 1px solid var(--font-color);
    border-radius: 50px;
    background: transparent;
    color: transparent;
    width: 20px;
    cursor: pointer;
    margin: 0 15px 0 38px;
    }

    .checkmark:hover {
    background:
      center url("../public/images/icon-check.svg") no-repeat,
      linear-gradient(135deg, hsl(192, 100%, 67%), hsl(200, 87%, 65%));
    }

    .funtions{
    display: flex;
    align-items: center;
    padding: 0 10px 0 0px;
    border-bottom: 1px solid var(--font-color);
    height: 60px;
    justify-content: space-between;
        button{
            height: 25px;
            background: transparent;
            border-radius: 5px;
            color: var(--font-color);
            border: 1px solid var(--font-color);

        }
    }

    footer {
        background: rgba(0, 0, 0, 0.5);
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 7px;
        padding: 10px;
        width: 100%;
        height: 50px;
        margin-top: auto;
    }


</style>
