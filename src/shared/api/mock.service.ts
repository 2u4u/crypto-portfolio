export const saveItemToLocalStorage = async <T>(
	key: string,
	data: T
): Promise<T | null> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			try {
				const existingData: T[] = JSON.parse(localStorage.getItem(key) || "[]");
				existingData.push(data);
				localStorage.setItem(key, JSON.stringify(existingData));
				resolve(data);
			} catch (error) {
				throw `Error saving to localStorage: ${error}`;
			}
		}, 1000);
	});
};

export const getAllItemsFromLocalStorage = async <T>(
	key: string
): Promise<T[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			try {
				const data: T[] = JSON.parse(localStorage.getItem(key) || "[]");
				resolve(data);
			} catch (error) {
				throw `Error reading from localStorage: ${error}`;
			}
		}, 1000);
	});
};

export const getTransactionByIdFromLocalStorage = async <
	T extends { id: string }
>(
	key: string,
	id: string
): Promise<T | null> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			try {
				const data: T[] = JSON.parse(localStorage.getItem(key) || "[]");
				const item = data.find((item) => item.id === id) || null;
				resolve(item);
			} catch (error) {
				throw `Error fetching data by ID from localStorage: ${error}`;
			}
		}, 1000);
	});
};

export const updateInLocalStorage = async <T extends { id: string }>(
	key: string,
	id: string,
	updatedData: Partial<T>
): Promise<T | null> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			try {
				const data: T[] = JSON.parse(localStorage.getItem(key) || "[]");
				const index = data.findIndex((item) => item.id === id);
				if (index !== -1) {
					data[index] = { ...data[index], ...updatedData };
					localStorage.setItem(key, JSON.stringify(data));
					resolve(data[index]);
				} else {
					resolve(null);
				}
			} catch (error) {
				throw `Error updating localStorage: ${error}`;
			}
		}, 1000);
	});
};

export const deleteFromLocalStorage = async <T extends { id: string }>(
	key: string,
	id: string
): Promise<boolean> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			try {
				let data: T[] = JSON.parse(localStorage.getItem(key) || "[]");
				data = data.filter((item) => item.id !== id);
				localStorage.setItem(key, JSON.stringify(data));
				resolve(true);
			} catch (error) {
				console.error("Error deleting from localStorage:", error);
				resolve(false);
			}
		}, 1000);
	});
};
