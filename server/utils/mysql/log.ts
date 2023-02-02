import chalk from 'chalk'

export const useDBG = (manager = false) => {
  const { header, time } = getTilte(manager)

  const log = (...data: any[]) =>
    console.log(chalk.green(header), chalk.blue(time), ...data)
  const warn = (...data: any[]) =>
    console.warn(chalk.yellow(header), chalk.blue(time), ...data)
  const error = (...data: any[]) =>
    console.error(chalk.red(header), chalk.blue(time), ...data)

  return { log, warn, error }
}

export const getTilte = (manager = false) => {
  const header = manager ? '[mysql-manager]' : '[mysql]'
  const date = new Date()
  const hours = date.getHours() + ''
  const minutes = date.getMinutes() + ''
  const seconds = date.getSeconds() + ''
  const time = `(${hours.padStart(2, '0')}:${minutes.padStart(
    2,
    '0'
  )}:${seconds.padStart(2, '0')})`
  return {
    header,
    time,
    toString: () => `${chalk.green(header)} ${chalk.blue(time)}`,
  }
}
