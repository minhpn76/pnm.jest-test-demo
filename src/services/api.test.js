import axios from "axios";
import { getUser, login } from "./api";

jest.mock("axios");

describe("API functions", () => {
  
  test("Should fetch user data successfully", async () => {
    const mockedUserData = { id: 1, name: "MinhPN" };

    axios.get.mockResolvedValue({ data: mockedUserData });

    const result = await getUser();
    expect(result).toEqual(mockedUserData);
    expect(axios.get).toHaveBeenCalledWith('/api/user');
  });

  test("Should post login data successfully", async () => {
    const mockedLoginResponse = { token: "123456" };
    const loginPayload = { username: "admin", password: "admin" };

    axios.post.mockResolvedValue({ data: mockedLoginResponse });

    const result = await login(loginPayload);
    expect(result).toEqual(mockedLoginResponse);
    expect(axios.post).toHaveBeenCalledWith('/api/login', loginPayload);
  });

});
