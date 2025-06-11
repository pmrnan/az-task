export type Status = {
    notStarted: {
        name: string,
        class: string
    },
    doing: {
        name: string,
        class: string
    },
    done: {
        name: string,
        class: string
    },
}

export type Option = {
  label: string;
  value: string;
};