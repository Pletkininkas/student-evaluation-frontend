'use strict';
export const streamOptions: string[] = ['FE', 'BE', 'QA', 'Project'];
export const communicationOptions: { id: number; name: string }[] = [
  { id: 0, name: `Is active, communicative` },
  { id: 1, name: `Is passive` },
  { id: 2, name: `Prefers written communication over verbal` },
];
export const abilityToLearnOptions: { id: number; name: string }[] = [
  { id: 0, name: `Is able to adapt to changing topics quickly` },
  { id: 1, name: `Doesn't understand but asks, tries to learn from mistakes` },
  { id: 2, name: `Doesn't understand and does nothing about it` },
];

export const directionOptions: { id: number; name: string }[] = [
  { id: 0, name: 'Java' },
  { id: 1, name: 'Angular' },
  { id: 2, name: 'Testing' },
  { id: 3, name: 'Other' },
];

export const overallEvaluationOptions: { id: number; name: string }[] = [
  { id: 1, name: '1 – not suitable' },
  { id: 2, name: '2 – not so good' },
  { id: 3, name: '3 – potential to grow' },
  { id: 4, name: '4 – strong growth' },
  { id: 5, name: '5 – motivated, really good' },
];
