import { Source } from 'callbag'

export default function of<T extends any[]>(...values: T): Source<T[number]>
