export function useUser() {
  // let id: RegExpMatchArray | null;
  let regexUser = document.cookie.match(/userId=(?<id>[^;]+);?$/);

  return {
    id: regexUser?.groups?.id,
  };
}
