const components = new Map();

const getElements = (activeComponent) => {
    let properties = mimi.getComponentDef(activeComponent.type).properties();
    let elements = [];
    let isContainer = activeComponent instanceof mmBaseContainer;
    let isLayout = activeComponent instanceof mmBaseLayout;
    let isFormElement = activeComponent instanceof mmBaseFormElement;
    let excludedProps = Object.keys(mimi.getComponentDef("mmComponent").properties()).filter((val) => {
        return val !== "class";
    });
    excludedProps.push("data");
    for (const [name, option] of Object.entries(properties)) {
        if (excludedProps.indexOf(name) > -1) {
            continue;
        }
        if (name === "components" && isFormElement) {
            continue;
        }
        if (name === "components" && isContainer) {
            continue;
        }
        let comp = activeComponent.copy(option);
        let value = activeComponent.prop(name);
        if (! comp.props) {
            comp.props = {};
        }
        comp.props.value = value;
        
        comp.name = name;
        let item = {
            comp: comp,
            option: {
                label: comp.label
            }
        };
        if (comp.type == "mmCheckbox") {
            item.option.class = "d-flex flex-row-reverse justify-content-end";
        }
        if (['mmForm', 'mmRepeater', 'mmComponentForm'].indexOf(comp.type) > -1) {
            comp.props.class = "p-2 border";
        }
        if (comp.type == "mmRepeater") {
            comp.props.isSingleColumn = true;
        }
        
        elements.push(item);

        delete comp.priority;
        delete comp.default;
        delete comp.label;
    }
    
    return elements;
}

const initSidenav = () => {
    const sidenav = mimi.component("sidenav", "mmSidenav");
    const compSelectOptions = mimi.getCompSelectOptions();
    
    let displayElements = [];
    let inputElements = [];
    let containerElements = [];
    let layoutElements = [];
    

    compSelectOptions.forEach((item) => {
        if (["mmFormElement", "mmContainer", "mmLayout", "mmComponent"].indexOf(item.value) > -1) {
            return;
        }
        let option = {
            type: item.value,
            props: {}
        };
        if (option.type == "mmModalManager" || option.type == "mmContextMenu") {
            option.props.class = ["position-absolute"];
        }
        components.set(item.value, mimi.create(option, jQuery("#homeless")));
        let def = components.get(item.value);
        if (def instanceof mmBaseFormElement) {
            inputElements.push(item);
        } else if (def instanceof mmBaseContainer && item.value != 'mmDataGrid') {
            containerElements.push(item);
        } else if (def instanceof mmBaseLayout) {
            layoutElements.push(item);
        } else {
            displayElements.push(item);
        }
    });

    sidenav.props({
        links: [
            {
                label: "Input",
                value: "input",
                menus: inputElements,
            },
            {
                label: "Container",
                value: "container",
                menus: containerElements
            },
            {
                label: "Layout",
                value: "layout",
                menus: layoutElements
            },
            ...displayElements
        ],
        active: mimi.option("data=>type") ? mimi.option("data=>type") : "mmAddonTextfield"
    }).apply();

    sidenav.on("click", (action) => {
        if (components.has(action)) {
            mimi.route("component", {
                type: action
            });
        }
    });
}

const initPropEditForm = () => {
    const previewBtn = mimi.component("preview", "mmButton");
    const propEditForm = mimi.component("prop-edit-form", "mmForm");
    const sidenav = mimi.component("sidenav", "mmSidenav");

    previewBtn.on("click", () => {
        const change = propEditForm.getChange();
        const activeComponent = components.get(sidenav.prop("active"));
        if (change) {
            activeComponent.props(change).apply();
            propEditForm.commits();
        }
    });
}

mimi.ready(() => {
    initSidenav();
    initPropEditForm();
});

mimi.state('component.ready', function() {
    const data = this.getData();
    const previewContainer = mimi.component("preview", "mmContent");
    const propEditForm = mimi.component("prop-edit-form", "mmForm");
    const activeComponent = components.get(data.type);
    const sidenav = mimi.component("sidenav", "mmSidenav");
    previewContainer.prop("content", activeComponent);
    propEditForm.prop("elements", getElements(activeComponent));
    sidenav.prop("active", data.type);
});